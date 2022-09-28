import axios from "axios";
import { apiProducts } from "../@api/api";

const SET_PRODUCTS = 'SET_PRODUCTS';
const SET_STATUS = 'SET_STATUS';
const SET_COMMENT = 'SET_COMMENT';
const SET_COMMENT_UI = 'SET_COMMENT_UI';
const DELETE_MESSAGE = 'DELETE_MESSAGE';
const POST_MESSAGE = 'POST_MESSAGE';
const SET_MESSAGE_LENGTH = 'SET_MESSAGE_LENGTH';
const SET_GOODS = 'SET_GOODS';
const REMOVE_GOODS = 'REMOVE_GOODS';
const CHANGE_BOOK = 'CHANGE_BOOK';

const initialState = {
    product: [
        {
            id: 1,
            imageUrl: "",
            name: "",
            count: 0,
            size: {
                width: 0,
                height: 0
            },
            weight: "",
            comments: [
                "CommentModel",
                "CommentModel"
            ]
        },
    ],
    status: null,
    lengthOfMessage: 0,
    selectedGoods: []

}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS: {
            return {
                ...state,
                product: action.products
            }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case SET_COMMENT: {
            return {
                ...state,
                product: changeComments(action.comments, state.product),
            }
        }
        case SET_COMMENT_UI: {
            return {
                ...state,
                product: changeComments([action.comment], state.product),
            }
        }
        case DELETE_MESSAGE: {
            return {
                ...state,
                product: [
                    ...state.product,
                    {comments: state.product.map(el => el.comments.filter(item => item.id !== action.id)),
                        //1 Try to fix it
                    }
                ],


                // .map(item => {
                //     return item.comments.filter(el => {
                //         if (el.id !== action.id) {
                //             return el
                //         } else {
                //             return false
                //         }}) 
                // })

            }
        }
        case SET_GOODS: {
            return {
                ...state,
                selectedGoods: [...state.selectedGoods, action.goods]
            }
        }
        case REMOVE_GOODS: {
            return {
                ...state,
                selectedGoods: state.selectedGoods.filter(item => item.id !== action.id)

            }
        }
        case CHANGE_BOOK: {
            return {
                ...state,
                product: [
                    state.product.map(el => {
                        if(el.id === action.id){
                            el.imageUrl = action.imageUrl;
                            el.name = action.name;
                            el.count = action.count;
                            el.size = action.size;
                            el.comments = action.comments;
                            el.weight = action.weight;
                        }
                    })
                ]
            }
        }

        default:
            return state;
    }
}

// const deleteMessageFromStore = (id, productId, product) => {
//     let newArr = []
//     for (const item of product) {
//         console.log(item);
//         newArr = item.comments.filter(mes => mes.id === id ? false : true)
//     }
//     console.log(newArr);
// }

const removeGoodsFun = (goods, id) => {
    let arr = goods.filter((item) => {
        if (item.id !== id) {
            return item
        }
    })
    return arr
}

const changeComments = (comments, product) => {
    debugger
    for (const iterator of comments) {
        for (const prodId of product) {
            if (iterator.productId === prodId.id) {
                prodId.comments.push(iterator)
                console.log(prodId);
            }
        }
    }
    return product
}

export const setProduct = (products) => {
    return { type: SET_PRODUCTS, products }
}

export const setMessageLength = (length) => {
    return { type: SET_MESSAGE_LENGTH, length }
}

export const setStatus = (status) => {
    return { type: SET_STATUS, status }
}

export const setComment = (comments) => {
    return { type: SET_COMMENT, comments }
}
export const setCommentUI = (comment) => {
    return { type: SET_COMMENT_UI, comment }
}
export const deleteMessageAC = (id) => {
    return { type: DELETE_MESSAGE, id }
}

export const selectGoods = (goods) => {
    return { type: SET_GOODS, goods }
}
export const removeGoods = (id) => {
    return { type: REMOVE_GOODS, id }
}

export const changeBooksAC = (id,imageUrl,name,count, size,comments, weight) => {
    return {type: CHANGE_BOOK, id,imageUrl,name,count, size,comments, weight}
}

export const postMessageAC = (id, productId, description, date) => {
    return { type: POST_MESSAGE, id, productId, description, date }
}

const checkResult = (response, dispatch, action) => {
    if (response.status >= 200 || response.status < 300) {
        dispatch(action(response.data));
        dispatch(setStatus('resolved'));
    } else {
        dispatch(setStatus(`rejected - ${response.status}`));
    }
}

export const getProducts = (sort, order) => async dispatch => {
    dispatch(setStatus('pending'));
    const response = await apiProducts.getProducts(sort, order);
    checkResult(response, dispatch, setProduct)

}

export const getComments = () => async dispatch => {
    dispatch(setStatus('pending'));
    const response = await apiProducts.getComments();
    setMessageLength(response.data);
    checkResult(response, dispatch, setComment)

}

export const deleteMessage = (id, productId) => async dispatch => {
    const response = await apiProducts.deleteMessage(id);
    dispatch(deleteMessageAC(id, productId));
    setCommentUI()

}

export const postMessage = (id, productId, description, date) => async dispatch => {
    const response = await apiProducts.postMessage(id, productId, description, date);
    checkResult(response, dispatch, setCommentUI)
}

// export const changeBooks = (id,imageUrl,name,count, width, height,comments, weight) => async dispatch => {
//     let size = {width, height}
//     const response = await apiProducts.changeBook(id,imageUrl,name,count, size, weight);
//     dispatch(changeBooksAC(id,imageUrl,name,count, size,comments, weight))
//     dispatch(getProducts())
// }
export default productReducer;