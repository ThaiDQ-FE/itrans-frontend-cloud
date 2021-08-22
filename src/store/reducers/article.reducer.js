import {
  GET_ANOTHER_ARTICLE_FAILED,
  GET_ANOTHER_ARTICLE_SUCCESS,
  GET_DETAIL_ARTICLE_BY_ID_FAILED,
  GET_DETAIL_ARTICLE_BY_ID_SUCCESS,
  GET_LIST_ARTICLE_FAILED,
  GET_LIST_ARTICLE_SUCCESS,
  GET_LIST_FOLLOWED_FAILED,
  GET_LIST_FOLLOWED_SUCCESS,
  GET_LIST_LINK_ARTICLE_FAILED,
  GET_LIST_LINK_ARTICLE_SUCCESS,
  GET_LIST_VIEW_ARTICLE_FAILED,
  GET_LIST_VIEW_ARTICLE_SUCCESS,
  SEARCH_ARTICLE_ADMIN_FAILED,
  SEARCH_ARTICLE_ADMIN_SUCCESS,
  SEARCH_ARTICLE_FAILED,
  SEARCH_ARTICLE_SUCCESS,
} from "../constants/article.const";

const initialState = {
  listArticle: [],
  listViewArticle: [],
  detailArticle: {},
  listAnotherArticle: [],
  listSearch: [],
  listSearchAdmin: [],
  listFollowed: [],
  listLinkArticle: [],
  errors: [],
};

const articleReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_LIST_ARTICLE_SUCCESS:
      return { ...state, listArticle: payload };
    case GET_LIST_ARTICLE_FAILED:
      return { ...state, errors: payload };
    case GET_LIST_VIEW_ARTICLE_SUCCESS:
      return { ...state, listViewArticle: payload };
    case GET_LIST_VIEW_ARTICLE_FAILED:
      return { ...state, errors: payload };
    case GET_DETAIL_ARTICLE_BY_ID_SUCCESS:
      return { ...state, detailArticle: payload };
    case GET_DETAIL_ARTICLE_BY_ID_FAILED:
      return { ...state, errors: payload };
    case GET_ANOTHER_ARTICLE_SUCCESS:
      return { ...state, listAnotherArticle: payload };
    case GET_ANOTHER_ARTICLE_FAILED:
      return { ...state, errors: payload };
    case SEARCH_ARTICLE_SUCCESS:
      return { ...state, listSearch: payload };
    case SEARCH_ARTICLE_FAILED:
      return { ...state, errors: payload };
    case SEARCH_ARTICLE_ADMIN_SUCCESS:
      return { ...state, listSearchAdmin: payload };
    case SEARCH_ARTICLE_ADMIN_FAILED:
      return { ...state, errors: payload };
    case GET_LIST_FOLLOWED_SUCCESS:
      return { ...state, listFollowed: payload };
    case GET_LIST_FOLLOWED_FAILED:
      return { ...state, errors: payload };
    case GET_LIST_LINK_ARTICLE_SUCCESS:
      return { ...state, listLinkArticle: payload };
    case GET_LIST_LINK_ARTICLE_FAILED:
      return { ...state, errors: payload };
    default:
      return state;
  }
};

export default articleReducer;
