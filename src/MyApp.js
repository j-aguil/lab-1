import React, {useState, useEffect} from "react";
import Table from "./Table";
import Form from "./Form";
import axios from "axios";



function MyApp(){
    const [characters, setCharacters] = useState([]);

    function removeOneCharacter (index) {
        //added delete call for part 6 step #4
        makeDeleteCall(characters[index]).then(result => {
            if (result && result.status === 204){
                const updated = characters.filter((character, i) => {
                    return i !== index;
                });
                setCharacters(updated)
            } 
        });
    }
    

    //part 3
    //-----
    async function fetchAll(){
        try {
            const response = await axios.get('http://localhost:5000/users');
            return response.data.users_list;
        } catch(error){
            //not handling errors. Just logging into the console
            console.log(error);
            return false;
        }
    }

    useEffect(() => {
        fetchAll().then( result => {
            if(result) {
                setCharacters(result);
            }
        });
    }, [] );
    //-----

    //part 5
    //-----
    async function makePostCall(person){
        try {
            const response = await axios.post('http://localhost:5000/users', person);
            //part 6 - #3
            //-----
            person.id = response.data.id;
            //-----
            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    function updateList(person) {
        makePostCall(person).then(result => {
            if (result && result.status === 201){
                setCharacters([...characters, person]);
            }
        });
    }
    //-----


    //part 6 - #4 (delete in frontend)
    //-----
    async function makeDeleteCall(person){
        try {
            const response = await axios.delete('http://localhost:5000/users/' + person.id, person);
            return response;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    //-----

    return(
        <div className="container">
            <Table characterData = {characters} removeCharacter = {removeOneCharacter} />
            <Form handleSubmit = {updateList} />
        </div>
    );
}

export default MyApp