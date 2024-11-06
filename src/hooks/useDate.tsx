const useDate = () => {
  function getCurrentDate() {
    const today = new Date();

    const year = today.getFullYear();
    const month = today.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줘야 합니다.
    const day = today.getDate();

    // 월과 일이 2자리로 나오도록 처리 (1자리일 경우 앞에 0을 추가)
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;

    return `${year}년 ${formattedMonth}월 ${formattedDay}일`;
  }

  function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours(); // 현재 시
    const minutes = now.getMinutes(); // 현재 분

    // 2자리로 만들어주기 (1자리일 경우 0을 붙이기)
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedHours}:${formattedMinutes}`;
  }

  return {
    getCurrentDate,
    getCurrentTime
  };
};
export default useDate;
