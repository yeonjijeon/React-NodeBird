import shortId from 'shortid'
import produce from '../util/produce';
import { faker } from '@faker-js/faker';

export const initialState = {
    mainPosts: [],
    imagePaths: [],
    addPostLoading: false,
    addPostDone: false,
    addPostError: false,

    removePostLoading: false,
    removePostDone: false,
    removePostError: false,

    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: false,
}


export const generateDummyPost = (number) => {
    faker.seed(123)
    Array(number).fill().map(() => ({
        id: shortId.generate(),
        User: {
            id: shortId.generate(),
            nickname: faker.person.fullName()
        },
        content: faker.lorem.sentence(),
        Images: [{
            src: faker.image.url()
        }],
        Comments: [{
            id : shortId.generate(),
            User: {
                id : shortId.generate(),
                nickname : faker.person.fullName(),
            },
            content: faker.lorem.sentence(),
        }]
    }))
}

faker.seed(123)
initialState.mainPosts = initialState.mainPosts.concat(
    Array(20).fill().map(() => ({
        id: shortId.generate(),
        User: {
            id: shortId.generate(),
            nickname: faker.person.fullName()
        },
        content: faker.lorem.sentence(),
        Images: [{
            src: faker.image.url()
        }],
        Comments: [{
            id : shortId.generate(),
            User: {
                id : shortId.generate(),
                nickname : faker.person.fullName(),
            },
            content: faker.lorem.sentence(),
        }]
    }))
    
    )

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST'
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS'
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE'

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST'
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS'
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE'

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST'
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS'
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE'

export const addPost = (data) => ({
    type: ADD_POST_REQUEST,
    data
})

export const addComment = (data) => ({
    type: ADD_COMMENT_REQUEST,
    data
})

const dummyPost = (data) => ({
    id : data.id,
    content: data.content,
    User: {
        id:1,
        nickname: '연지',
    },
    Images: [],
    Comments: [],
})

const dummyComment = (data) => ({
    id :shortId.generate(),
    content: data,
    User: {
        id: 1,
        nickname: '연지',
    },
})

// reducer란 ? 이전상태를 액션을 통해 다음 상태로 만들어내는 함수 (불변성을 지키면서)
const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch(action.type) {
            // 글 게시
            case ADD_POST_REQUEST:
                draft.addPostLoading = true
                draft.addPostDone = false
                draft.addPostError = null
                break
    
            case ADD_POST_SUCCESS:
                draft.addPostLoading = false
                draft.addPostDone = true
                draft.mainPosts.unshift(dummyPost(action.data))
                break
    
            case ADD_POST_FAILURE:    
                draft.addPostLoading = false
                draft.addPostDone = action.error
                break
    
            // 글 삭제
            case REMOVE_POST_REQUEST:
                draft.removePostLoading = true
                draft.removePostDone = false
                draft.removePostError = null
                break
    
            case REMOVE_POST_SUCCESS:
                draft.removePostLoading = false
                draft.removePostDone = true
                draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data)
                break
    
            case REMOVE_POST_FAILURE:    
                draft.removePostLoading = false
                draft.removePostDone = action.error
                break
    
            // 댓글 게시
            case ADD_COMMENT_REQUEST:
                draft.addCommentLoading = true
                draft.addCommentDone = false
                draft.addCommentError = null
                break
    
            case ADD_COMMENT_SUCCESS: {
                const post = draft.mainPosts.find((v) => v.id === action.data.postId)
                post.Comments.unshift(dummyComment(action.data.content))
                draft.addCommentLoading = false
                draft.addCommentDone = true
                break
            }
    
            case ADD_COMMENT_FAILURE:    
                draft.addCommentLoading = false
                draft.addCommentDone = action.error
                break
    
            default:
                break
        }
    });
}

export default reducer;