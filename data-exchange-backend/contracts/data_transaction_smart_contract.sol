// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;
contract data_transaction {
    struct data {
        string dataHash;
        string dataset_name;
        string data_category;
        address seller;
        uint price;
        string description;
        address[] buyers;
    }
    struct ML_API_key {
        string api_key;
        string ml_product_name;
        address seller;
        uint price;
        string description;
        address[] buyers;
    }

    mapping(uint => data) data_map;
    mapping(uint => ML_API_key) ML_API_keys;
    uint raw_data_id;
    uint[] raw_data_id_list;
    uint ml_key_id;
    uint[] ml_key_id_list;
    
    receive () external payable {}
    event excess_eth_returned(address, uint);  //exchange excess eth sent to sender

    function uploadData(string memory data_hash, string memory dataset_name, string memory data_category,uint price, string memory data_description) public payable {
        data_map[raw_data_id] = data(data_hash, dataset_name, data_category, msg.sender, price, data_description, new address[](0));
        payable(msg.sender).transfer(msg.value);
        emit excess_eth_returned(msg.sender, msg.value);
        
        raw_data_id_list.push(raw_data_id);
        raw_data_id += 1;
    }

    function purchaseData(uint data_id) public payable{
        require(msg.value >= data_map[data_id].price, "Indaquate ETH sent");
        payable(msg.sender).transfer(msg.value - data_map[data_id].price);
        emit excess_eth_returned(msg.sender, msg.value - data_map[data_id].price);
        payable(data_map[data_id].seller).transfer(data_map[data_id].price);
        data_map[data_id].buyers.push(msg.sender);
    }

    function view_purchased_raw_data(uint data_id) public view returns (string memory) {
        for(uint i=0; i<data_map[data_id].buyers.length; i++){
            if(msg.sender==data_map[data_id].buyers[i]){
                return data_map[data_id].dataHash;
            }
        }
        return "You haven't purchased this dataset!";
    }

    //For front-end view
    function view_raw_data_id_list() public view returns (uint[] memory) {
        return raw_data_id_list;
    }

    //For front-end view
    function view_ml_key_id_list() public view returns (uint[] memory) {
        return ml_key_id_list;
    }

    //For front-end retrieval
    function retrieve_raw_data_info(uint[] memory data_id_list) public view returns (string[] memory, uint[] memory, string[] memory,string[] memory){
        string[] memory dataset_name_list = new string[](data_id_list.length);
        uint[] memory data_price_list = new uint[](data_id_list.length);
        string[] memory data_category_list = new string[](data_id_list.length);
        string[] memory data_description_list = new string[](data_id_list.length);
        for (uint i=0; i<data_id_list.length; i++){
             dataset_name_list[i] = data_map[data_id_list[i]].dataset_name;
             data_price_list[i] = data_map[data_id_list[i]].price;
             data_category_list[i] = data_map[data_id_list[i]].data_category;
             data_description_list[i] = data_map[data_id_list[i]].description;
        }
        return (dataset_name_list, data_price_list, data_category_list, data_description_list);
    }
    
    }
