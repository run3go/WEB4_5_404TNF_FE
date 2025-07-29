const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const createPost = async ({
  title,
  content,
  boardType,
  images,
}: {
  title: string;
  content: string;
  boardType: 'FREE' | 'QUESTION';
  images: (File | string)[];
}) => {
  const formData = new FormData();

  formData.append('request', JSON.stringify({ title, content, boardType }));

  images.forEach((image) => {
    formData.append('images', image);
  });

  const res = await fetch(`${baseURL}/api/community/articles/v1`, {
    method: 'POST',
    body: formData,
    credentials: 'include',
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || '게시글 작성 실패');
  }

  return data;
};

export const updatePost = async ({
  title,
  content,
  boardType,
  images,
  postId,
}: {
  title: string;
  content: string;
  boardType: 'FREE' | 'QUESTION';
  images: (File | string)[];
  postId: number;
}) => {
  const formData = new FormData();

  formData.append('request', JSON.stringify({ title, content, boardType }));

  images.forEach((image) => {
    formData.append('images', image);
  });

  const res = await fetch(`${baseURL}/api/community/articles/v1/${postId}`, {
    method: 'PATCH',
    body: formData,
    credentials: 'include',
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || '게시글 작성 실패');
  }

  return data;
};

export const removePost = async ({ postId }: { postId: number }) => {
  const res = await fetch(`${baseURL}/api/community/articles/v1/${postId}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || '게시글 삭제 실패');
  }

  return data;
};

export const getPostDetail = async (postId: number) => {
  const res = await fetch(`${baseURL}/api/community/articles/v1/${postId}`, {
    credentials: 'include',
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || '게시글 불러오기 실패');
  }

  return data;
};

export const getPostList = async ({
  page,
  size,
  boardType,
  sortType,
  searchType,
  keyword,
}: {
  page: number;
  size: number;
  boardType: 'FREE' | 'QUESTION';
  sortType: string;
  searchType: string;
  keyword: string;
}) => {
  const res = await fetch(
    `${baseURL}/api/community/articles/v1?page=${page}&size=${size}&boardType=${boardType}&sortType=${sortType}&searchType=${searchType}&keyword=${keyword}`,
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || '게시글 불러오기 실패');
  }

  return data;
};

export const createComment = async ({
  postId,
  comment,
}: {
  postId: number;
  comment: string;
}) => {
  const res = await fetch(
    `${baseURL}/api/community/articles/${postId}/replies/v1?content=${comment}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    },
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || '댓글 작성 실패');
  }

  return data;
};

export const getCommentList = async ({
  postId,
  totalComment,
}: {
  postId: number;
  totalComment: number;
}) => {
  const size = totalComment > 0 ? totalComment : 1;
  const res = await fetch(
    `${baseURL}/api/community/articles/${postId}/replies/v1?page=1&size=${size}`,
    {
      credentials: 'include',
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || '게시글 불러오기 실패');
  }

  return data;
};

export const updateComment = async ({
  postId,
  replyId,
  comment,
}: {
  postId: number;
  replyId: number;
  comment: string;
}) => {
  const res = await fetch(
    `${baseURL}/api/community/articles/${postId}/replies/v1/${replyId}?content=${comment}`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    },
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || '댓글 작성 실패');
  }

  return data;
};

export const removeComment = async ({
  postId,
  replyId,
}: {
  postId: number;
  replyId: number;
}) => {
  const res = await fetch(
    `${baseURL}/api/community/articles/${postId}/replies/v1/${replyId}`,
    {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    },
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || '댓글 삭제 실패');
  }

  return data;
};

export const report = async ({
  reporterId,
  reportedId,
  reportType,
  contentId,
  reportCategory,
  reason,
}: {
  reporterId: number;
  reportedId: number;
  reportType: 'BOARD' | 'REPLY';
  contentId: number;
  reportCategory: string;
  reason: string;
}) => {
  const res = await fetch(`${baseURL}/api/community/reports/v1`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      reporterId,
      reportedId,
      reportType,
      contentId,
      reportCategory,
      reason,
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || '신고 실패');
  }

  return data;
};

export const requestLike = async (postId: number) => {
  const res = await fetch(
    `${baseURL}/api/community/articles/v1/${postId}/like`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    },
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || '좋아요 요청 실패');
  }

  return data;
};

export const cancelLike = async (postId: number) => {
  const res = await fetch(
    `${baseURL}/api/community/articles/v1/${postId}/like`,
    {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    },
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || '좋아요 취소 실패');
  }

  return data;
};

export const getLikeCount = async (postId: number) => {
  const res = await fetch(
    `${baseURL}/api/community/articles/v1/${postId}/like`,
    {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    },
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || '좋아요 요청 실패');
  }

  return data;
};

export const getCommentCount = async (postId: number) => {
  const res = await fetch(
    `${baseURL}/api/community/articles/v1/${postId}/reply`,
    {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    },
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || '좋아요 요청 실패');
  }

  return data;
};
