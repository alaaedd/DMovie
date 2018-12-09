//solium-disable linebreak-style
pragma solidity ^0.4.23;
pragma experimental ABIEncoderV2;

contract movie_publish {
    uint256 movieTokenCounter;
    uint256 movieCounter; 
    address[] owners_list;

    struct file {
        uint256 id;
        string name;
        string link;
        uint256 price;
        uint downloads;
    }
    struct movietoken{
        uint256 id;
        file movie;
        string ownerPkey;
        string movieHash;
    }
    file[] files_list;
    movietoken[] movieTokens_list;
    mapping (uint256 => address) file_to_owner;
    mapping (uint256 => uint) file_to_index;
    mapping (string => uint) name_to_index;
    mapping (address => uint) owner_to_index;
    mapping (uint256 => uint) movietoken_to_index;
    mapping (uint256 => address) movietoken_to_owner;

    //events
    event MovieTokenPurchased(address sender, uint256 id);
    event HashReadyToPublish (string movieName, address tokenOwner, string movieHash);
    event MovieAdded (uint256 id, address movieOwner, string name);

    function buyMovieToken(uint256 id, string _ownerPkey) public payable{
        uint256 weiAmount = msg.value;
        if (_validMovie(id)){
            if(_validAmount(id, weiAmount)){
                _createMovieToken(msg.sender, id, _ownerPkey);
                _forwardFunds(id);
                emit MovieTokenPurchased(msg.sender, movieTokens_list[movieTokens_list.length-1].id);
            }
            else revert("Insuffisant payed amount");
        }
        else revert ("Invalid Movie ID");
        
    }

    function createMovie(string _name, string _link, uint256 _price) public {
        if (!_exist(msg.sender)) owners_list.push(msg.sender);
        file memory movie;
        movieCounter++;
        movie.id = movieCounter;
        movie.name = _name;
        movie.link = _link;
        movie.price = _price;
        files_list.push(movie);
        file_to_index[movie.id] = files_list.length-1;
        name_to_index[movie.name] = files_list.length-1;
        file_to_owner[movie.id] = msg.sender;
        emit MovieAdded(movie.id, msg.sender, movie.name);
    }

    function addHashToMovieToken (uint256 _id, string _hash) public {
        uint index = movietoken_to_index[_id];
        movieTokens_list[index].movieHash = _hash;
        emit HashReadyToPublish(
            movieTokens_list[index].movie.name,
            movietoken_to_owner[_id],
            _hash
        );
    }

    function getOwnMovies () public view returns (string[]) {
        string[] storage moviesNames;
       
        for (uint i = 0; i < files_list.length; i++){
            if (file_to_owner[files_list[i].id] == msg.sender)
            moviesNames.push(files_list[i].name);
        }
        if (file_to_owner[files_list[files_list.length-1].id] == msg.sender)
        moviesNames.push(files_list[files_list.length-1].name);
        return moviesNames;
    }

    function getMovieList () public view returns (string[]){
        string[] storage moviesNames;
        for (uint i = 0; i < files_list.length; i++)
        moviesNames.push(files_list[i].name);
        moviesNames.push(files_list[files_list.length-1].name);
        return moviesNames;
    }

    function getMovieDetails (string name) public view 
    returns (uint256 _id,
             string _name,
             string _link,
             uint256 _price,
             uint _downloads) {
        uint index = name_to_index[name];
        file movie = files_list[index];
        return (movie.id, movie.name, movie.link, movie.price, movie.downloads);
    }

    function _exist(address owner) private view returns(bool) { 
        for (uint i = 0; i < owners_list.length; i++){
            if (owners_list[i] == owner) break;
        }
        if (i == owners_list.length) return false;
        return true;
    }

    function _validMovie(uint256 id) private view returns(bool){
        if (file_to_owner[id] == address(0)) return false;
        return true;
    }    

    function _validAmount(uint256 id, uint256 weiAmount) private view returns(bool){
        file movieFile = files_list[file_to_index[id]];
        if (weiAmount < movieFile.price) return false;
        return true;
    }

    function _createMovieToken(address sender, uint256 id, string ownerPkey) private {
        movietoken memory token;
        movieTokenCounter++;
        token.id = movieTokenCounter;
        file movieFile = files_list[file_to_index[id]];
        movieFile.downloads ++;
        token.movie = movieFile;
        token.ownerPkey = ownerPkey;
        movieTokens_list.push(token);
        movietoken_to_owner[token.id] = sender;
        movietoken_to_index[token.id] = movieTokens_list.length - 1;
    }    

    function _forwardFunds(uint256 id) private {
        file_to_owner[id].transfer(msg.value);
    }
     
}
