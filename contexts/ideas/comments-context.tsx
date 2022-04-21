import { NextRouter, useRouter } from "next/router";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";

const PAGE_SIZE = 20;

type ListStatusInitialStateType = {
  data: any[];
  pageSize: number;
  totalResults: number;
  selectedCommentId?: number;
  loadedPages: number[];
  minLoadedItemIndex: number;
  isLoaded: boolean;
  selectedItemIndex?: number;
};

const listStatusInitialState: ListStatusInitialStateType = {
  data: [],
  pageSize: PAGE_SIZE,
  totalResults: null,
  selectedCommentId: null,
  loadedPages: [],
  minLoadedItemIndex: 0,
  isLoaded: false,
  selectedItemIndex: null
};

const CommentsContext = createContext({
  viewPrivateMessages: false,
  toggleViewMessages: () => {},
  getComments: (index?: number, isPrepend?: boolean) => {},
  updateCommentsList: (commentId: number) => {},
  listStatus: listStatusInitialState
});

const fetchCommentsAsync = async (
  entityType: string,
  entityId: number,
  page: number,
  commentId?: number,
  isPrivate: boolean = false
): Promise<any> => {
  return await api(demoTenantAPI)
    .get(requestFeeds)
    .then((res) => res.pagedResults);
};

const getCommentListInitialState = (
  router: NextRouter,
  isPrivateList: boolean
) => {
  return listStatusInitialState;
};

const calculateNextPage = (
  endedPage: number,
  { loadedPages, selectedCommentId }: ListStatusInitialStateType,
  isPrepend: boolean
) => {
  let nextPage: number;

  nextPage = isPrepend ? endedPage - 1 : endedPage + 1;

  return nextPage;
};

const CommentsContextProvider = ({ children }) => {
  const previousViewPrivateMessages = useRef(null);
  const router = useRouter();
  const [viewPrivateMessages, setViewPrivateMessages] = useState<boolean>(null);
  const [commentListStatus, setCommentListStatus] = useState(() =>
    getCommentListInitialState(router, false)
  );
  const generalStatus = {
    comments: {
      listStatus: commentListStatus,
      setListStatus: setCommentListStatus
    }
  };

  useEffect(() => void getComments(), []);

  const toggleViewMessages = () => {
    setViewPrivateMessages((viewPrivateMessages) => {
      previousViewPrivateMessages.current = viewPrivateMessages;
      return !viewPrivateMessages;
    });
  };

  const getComments = useCallback(
    async (endedPage?: number, isPrepend: boolean = false) => {
      const commentsInfo = generalStatus.comments;

      const { listStatus, setListStatus } = commentsInfo;

      const nextPage = calculateNextPage(endedPage, listStatus, isPrepend);
      const numberOfPages = Math.ceil(listStatus.totalResults / PAGE_SIZE);
      const numberOfLoadedPages = listStatus.loadedPages.length;

      if (
        listStatus.loadedPages.includes(nextPage) ||
        nextPage < 1 ||
        (numberOfLoadedPages > 0 && nextPage > numberOfPages)
      )
        return;

      let commentsResponse = await fetchCommentsAsync(
        router.query.entityType as string,
        +router.query.entityId,
        nextPage,
        listStatus.selectedCommentId,
        viewPrivateMessages
      );

      const isValidSelectedCommentId =
        commentsResponse.totalResults > 0 &&
        commentsResponse.results.length > 0;

      if (!isValidSelectedCommentId) {
        commentsResponse = await fetchCommentsAsync(
          router.query.entityType as string,
          +router.query.entityId,
          1,
          listStatus.selectedCommentId,
          viewPrivateMessages
        );
      }

      const loadedPages = [
        ...listStatus.loadedPages,
        commentsResponse.currentPage
      ];

      const minLoadedItemIndex =
        Math.min(...loadedPages) * PAGE_SIZE - PAGE_SIZE;

      let selectedItemIndex: number = null;

      if (listStatus.selectedCommentId) {
        selectedItemIndex =
          commentsResponse.currentPage * commentsResponse.pageSize -
          commentsResponse.pageSize +
          commentsResponse.results.findIndex(
            (comment) => comment.id === listStatus.selectedCommentId
          );
      }

      setListStatus((status) => {
        const data = isPrepend
          ? [
              ...(commentsResponse.results as CommentExtendedDetailsDto[]),
              ...status.data
            ]
          : [
              ...status.data,
              ...(commentsResponse.results as CommentExtendedDetailsDto[])
            ];

        return {
          ...status,
          totalResults: commentsResponse.totalResults,
          loadedPages,
          minLoadedItemIndex,
          selectedCommentId: isValidSelectedCommentId
            ? status.selectedCommentId
            : null,
          data,
          isLoaded: true,
          selectedItemIndex
        };
      });
    },
    [
      generalStatus.comments,
      router.query.entityId,
      router.query.entityType,
      viewPrivateMessages
    ]
  );

  const updateCommentsList = async (commentId: number) => {
    if (!commentId) return;

    const commentsInfo = generalStatus.comments;

    const commentsResponse = await fetchCommentsAsync(
      router.query.entityType as string,
      +router.query.entityId,
      null,
      commentId,
      viewPrivateMessages
    );

    const loadedPages = [commentsResponse.currentPage];

    const minLoadedItemIndex = Math.min(...loadedPages) * PAGE_SIZE - PAGE_SIZE;

    let selectedItemIndex: number =
      commentsResponse.currentPage * commentsResponse.pageSize -
      commentsResponse.pageSize +
      commentsResponse.results.findIndex((comment) => comment.id === commentId);

    commentsInfo.setListStatus((status) => {
      const data = [
        ...(commentsResponse.results as CommentExtendedDetailsDto[])
      ];

      return {
        ...status,
        totalResults: commentsResponse.totalResults,
        loadedPages,
        minLoadedItemIndex,
        selectedCommentId: commentId,
        data,
        isLoaded: true,
        selectedItemIndex
      };
    });
  };

  const value = {
    viewPrivateMessages,
    toggleViewMessages,
    getComments,
    updateCommentsList,
    listStatus: commentListStatus
  };

  return (
    <CommentsContext.Provider value={value}>
      {children}
    </CommentsContext.Provider>
  );
};

export default CommentsContextProvider;

export const useCommentsContext = () => {
  const ctx = useContext(CommentsContext);
  return ctx;
};
