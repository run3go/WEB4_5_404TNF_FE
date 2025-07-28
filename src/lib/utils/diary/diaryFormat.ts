export const formatTime = (datetime: string) => {
  const date = new Date(datetime);
  const hour = date.getHours().toString().padStart(1, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');
  return `${hour}시 ${minute}분`;
};

export const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const yyyy = date.getFullYear();
  const mm = (date.getMonth() + 1).toString().padStart(2, '0');
  const dd = date.getDate().toString().padStart(2, '0');
  return `${yyyy}. ${mm}. ${dd}`;
};
