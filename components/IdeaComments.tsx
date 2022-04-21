import { FC, memo, useCallback, useEffect, useRef, useState } from "react";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import { useAppContext } from "../contexts/common/app-context";
import { useRouter } from "next/router";
import useItemVisibility from "../utils/hooks/useItemVisibility";
import useSWRInfinite from "swr/infinite";

const Comment: FC<{
  post: any;
  index: number;
  handleVisibilityChanged: (
    index: number,
    id: number,
    isVisible: boolean
  ) => void;
}> = memo(
  ({ post, index, handleVisibilityChanged }) => {
    const ref = useRef(null);
    const { mainElementRef } = useAppContext();
    const { isVisible } = useItemVisibility(mainElementRef, ref);

    useEffect(() => handleVisibilityChanged(index, post.id, isVisible), [
      isVisible,
      index,
      post.id,
      handleVisibilityChanged
    ]);

    return (
      <div
        ref={ref}
        className={
          "h-32 idea-comment-wrapper pb-6 pt-6 mb-6 border-b px-5 clip-path-card-lg relative"
        }
      >
        {post.title}
      </div>
    );
  },
  (prevProps, nextProps) => {
    if (!prevProps.post) return false;

    return true;
  }
);

Comment.displayName = "Comment";

const HistoryRecord: FC<{
  post: any;
  index: number;
  handleVisibilityChanged: (
    index: number,
    id: number,
    isVisible: boolean
  ) => void;
}> = memo(
  ({ post, index, handleVisibilityChanged }) => {
    const ref = useRef(null);
    const { mainElementRef } = useAppContext();
    const { isVisible } = useItemVisibility(mainElementRef, ref);

    useEffect(() => handleVisibilityChanged(index, post.id, isVisible), [
      isVisible,
      index,
      post.id,
      handleVisibilityChanged
    ]);

    return (
      <div
        ref={ref}
        className="h-64 idea-comment-wrapper pb-6 pt-6 mb-6 px-5 bg-brand-gray-lightest clip-path-card-md relative"
      >
        {post.title}
      </div>
    );
  },
  (prevProps, nextProps) => {
    if (!prevProps.post) return false;

    return true;
  }
);

HistoryRecord.displayName = "HistoryRecord";

type VisibleComment = {
  index: number;
  id: number;
};

const IdeaComments: FC = () => {
  const router = useRouter();
  const debounceRef = useRef(null);
  const { mainElementRef } = useAppContext();
  const [visibleComments, setVisibleComments] = useState<VisibleComment[]>([]);

  useEffect(() => {
    if (visibleComments.length === 0) return;

    const maxVisibleIndex = Math.max(
      ...visibleComments.map((item) => item.index)
    );

    const bottomCommentId = visibleComments.find(
      (item) => item.index === maxVisibleIndex
    ).id;

    if (router.query?.commentId && +router.query?.commentId === bottomCommentId)
      return;

    debounceRef.current && clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      console.log(router);
      console.log("AQUI");
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, commentId: bottomCommentId }
        },
        undefined,
        { shallow: true }
      );
    }, 100);

    return () => debounceRef.current && clearTimeout(debounceRef.current);
  }, [visibleComments, router]);

  const handleVisibilityChanged = useCallback(
    (index: number, id: number, isVisible: boolean) => {
      console.log("INSIDE handleVisibilityChanged");
      setVisibleComments((visibleComments) =>
        isVisible
          ? [...visibleComments, { index, id }]
          : visibleComments.filter((visibleComment) => visibleComment.id !== id)
      );
    },
    []
  );

  return (
    <CommentsList
      mainElementRef={mainElementRef}
      handleVisibilityChanged={handleVisibilityChanged}
    />
  );
};

type CommentsListType = {
  mainElementRef: any;
  handleVisibilityChanged: (
    index: number,
    id: number,
    isVisible: boolean
  ) => void;
};

const fetcher = (url) => fetch(url).then((res) => res.json());
const PAGE_SIZE = 25;

const CommentsList: FC<CommentsListType> = memo(
  ({ mainElementRef, handleVisibilityChanged }) => {
    const virtuosoRef = useRef<VirtuosoHandle>(null);

    const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
      (index, previousPageData) => {
        if (previousPageData && !previousPageData.length) return null;

        const currentPage = index + 1;
        const start = currentPage * PAGE_SIZE - PAGE_SIZE;
        const end = currentPage * PAGE_SIZE;

        return `https://jsonplaceholder.typicode.com/posts?_start=${start}&_end=${end}`;
      },
      fetcher,
      {}
    );

    const isLoadingInitialData = !data && !error;
    const isLoadingMore =
      isLoadingInitialData ||
      (size > 0 && data && typeof data[size - 1] === "undefined");

    const handleEndReached = useCallback(
      (index) => {
        console.log("INSIDE endReached");
        console.log(data);

        if (data && data[data.length - 1]?.length < PAGE_SIZE) return;

        !isLoadingMore && setSize(size + 1);
      },
      [isLoadingMore, setSize, size]
    );

    if (!mainElementRef) return null;

    return (
      <>
        <div className="w-full  h-full px-0 bg-white lg:border-none border-t border-gray-200">
          <Virtuoso
            ref={virtuosoRef}
            style={{ height: "100%" }}
            data={data ? [].concat(...data) : []}
            customScrollParent={mainElementRef?.current}
            // firstItemIndex={0}
            // startReached={() => setSize(size - 1)}
            endReached={handleEndReached}
            // overscan={100}
            itemContent={(index, post) => {
              return index % 2 === 0 ? (
                <Comment
                  post={post}
                  index={index}
                  handleVisibilityChanged={handleVisibilityChanged}
                />
              ) : (
                <HistoryRecord
                  post={post}
                  index={index}
                  handleVisibilityChanged={handleVisibilityChanged}
                />
              );
            }}
          />
        </div>
      </>
    );
  },
  (prevProps, nextProps) => {
    if (nextProps.ideaAuthorId !== prevProps.ideaAuthorId) return false;
    if (nextProps.mainElementRef !== prevProps.mainElementRef) return false;
    if (
      JSON.stringify(nextProps.ideaCoAuthorsIds) !==
      JSON.stringify(prevProps.ideaCoAuthorsIds)
    )
      return false;

    return true;
  }
);

CommentsList.displayName = "CommentsList";

export default IdeaComments;
