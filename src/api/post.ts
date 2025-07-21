export const createPost = async ({
  title,
  content,
  boardType,
  images,
}: {
  title: string;
  content: string;
  boardType: 'FREE' | 'QUESTION';
  images: File[];
}) => {
  const formData = new FormData();

  formData.append('request', JSON.stringify({ title, content, boardType }));

  images.forEach((image) => {
    formData.append('images', image);
  });

  const res = await fetch(
    'https://mungdiary-172598302113.asia-northeast3.run.app/api/community/articles/v1',
    {
      method: 'POST',
      body: formData,
      credentials: 'include',
    },
  );

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
  images: File[];
  postId: number;
}) => {
  const formData = new FormData();

  formData.append('request', JSON.stringify({ title, content, boardType }));

  images.forEach((image) => {
    formData.append('images', image);
  });

  const res = await fetch(
    `https://mungdiary-172598302113.asia-northeast3.run.app/api/community/articles/v1/${postId}`,
    {
      method: 'PATCH',
      body: formData,
      credentials: 'include',
    },
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || '게시글 작성 실패');
  }

  return data;
};

export const getPostDetail = async (postId: number) => {
  const res = await fetch(
    `https://mungdiary-172598302113.asia-northeast3.run.app/api/community/articles/v1/${postId}`,
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
    `https://mungdiary-172598302113.asia-northeast3.run.app/api/community/articles/${postId}/replies/v1?content=${comment}`,
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
  const res = await fetch(
    `https://mungdiary-172598302113.asia-northeast3.run.app/api/community/articles/${postId}/replies/v1?page=1&size=${totalComment}`,
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
    `https://mungdiary-172598302113.asia-northeast3.run.app/api/community/articles/${postId}/replies/v1/${replyId}?content=${comment}`,
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
    `https://mungdiary-172598302113.asia-northeast3.run.app/api/community/articles/${postId}/replies/v1/${replyId}`,
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
