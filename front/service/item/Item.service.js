import axios from "axios";
import { config } from "../../src/config/config";
import authHeader from '../user/auth-header'

const API_URL = config+"api/item/";

class ItemService {
    createItemUser(id, data) {
         return axios.post(API_URL + "createItemUser/"+id, data,  { headers: { Authorization:  authHeader() }});
    } 
    getItemAll() {
        return axios.get(API_URL + "non/getItemAll", null, { headers: { Authorization:  authHeader() }});
    } 
    getItemById(itemId) {
        return axios.get(API_URL + "getItemById/"+itemId,  { headers: { Authorization:  authHeader() }});
    } 
    updateItemById(id, data) {
        return axios.patch(API_URL + "updateItemById/"+id, data,  { headers: { Authorization:  authHeader() }});
   } 
    deleteItemById(itemId) {
        return axios.delete(API_URL + "deleteItemById/"+itemId, { headers: { Authorization:  authHeader() }});
    }  
    likeItemAndUserById(itemId,userId) {
        return axios.post(API_URL + "likeItemAndUserById/"+itemId+"/"+userId, null,  { headers: { Authorization:  authHeader() }});
    } 
    unlikeItemAndUserById(itemId,userId) {
        return axios.delete(API_URL + "unlikeItemAndUserById/"+itemId+"/"+userId, { headers: { Authorization:  authHeader() }});
    }
}

export default new ItemService();
