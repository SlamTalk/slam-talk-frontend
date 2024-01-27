export const validateNickname = (nickname: string) => {
  const regex = /^[A-Za-z0-9가-힣]+$/;
  return regex.test(nickname);
};

export const validateEmail = (email: string) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i.test(email);

export const validatePassword = (password: string) =>
  /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,16}$/.test(
    password
  );
