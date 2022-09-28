import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:3001/',
})

export const apiProducts = {
    getProducts(sort = 'name', order ='asc') {
        return instance.get(`product`).then( // ?_sort=${sort}&_order=${order}
            response => response
        ).catch(error => error.response)
    },
    getComments() {
        return instance.get(`comment`).then(
            response => response
        ).catch(error => error.response)
    },
    deleteMessage(id) {
        return instance.delete(`comment/${id}`).then(
            response => response
        ).catch(error => error.response)
    },
    postMessage(id, productId, description, date) {
        return instance.post(`comment`, {
            "id": id,
            "productId": productId,
            "description": description,
            "date": date
        }).then(
            response => response
        ).catch(error => error.response)
    }
    // changeBook(id,imageUrl,name,count, size, weight = 0) {
    //     return instance.put(`product/${id}`, {
    //         imageUrl,name,count, size, weight
    //     }).then(
    //         response => response
    //     ).catch(error => error.response)
    // }
} 
