import axios from "axios";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Signup = () => {
  // 이메일, 비밀번호, 비밀번호 확인
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  //오류메시지 상태저장
  const [emailMessage, setEmailMessage] = useState<string>("");
  const [passwordMessage, setPasswordMessage] = useState<string>("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] =
    useState<string>("");

  // 유효성 검사
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false);
  const nav = useNavigate();

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        await axios
          .post(
            "https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/auth/signup",
            {
              password: password,
              email: email,
            }
          )
          .then((res) => {
            console.log("response:", res);
            if (res.status === 201) {
              nav("/");
            }
          });
      } catch (err: any) {
        console.error(err);
        alert(`${err.response.data.message}`);
      }
    },
    [email, nav, password]
  );

  // 이메일
  const onChangeEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const emailRegex =
        /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      const emailCurrent = e.target.value;
      setEmail(emailCurrent);

      if (!emailRegex.test(emailCurrent)) {
        setEmailMessage("이메일 형식이 틀렸어요! 다시 확인해주세요 ㅜ ㅜ");
        setIsEmail(false);
      } else {
        setEmailMessage("올바른 이메일 형식이에요 : )");
        setIsEmail(true);
      }
    },
    []
  );

  // 비밀번호
  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
      const passwordCurrent = e.target.value;
      setPassword(passwordCurrent);

      if (!passwordRegex.test(passwordCurrent)) {
        setPasswordMessage(
          "숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!"
        );
        setIsPassword(false);
      } else {
        setPasswordMessage("안전한 비밀번호에요 : )");
        setIsPassword(true);
      }
    },
    []
  );

  // 비밀번호 확인
  const onChangePasswordConfirm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordConfirmCurrent = e.target.value;
      setPasswordConfirm(passwordConfirmCurrent);

      if (password === passwordConfirmCurrent) {
        setPasswordConfirmMessage("비밀번호를 똑같이 입력했어요 : )");
        setIsPasswordConfirm(true);
      } else {
        setPasswordConfirmMessage("비밀번호가 틀려요. 다시 확인해주세요 ㅜ ㅜ");
        setIsPasswordConfirm(false);
      }
    },
    [password]
  );

  return (
    <>
      <BackGround>
        <div
          style={{ marginBottom: "20px", fontWeight: "600", fontSize: "30px" }}
        >
          회원가입
        </div>
        <Title title="회원가입" className="loginMt" />
        <form onSubmit={onSubmit}>
          <FormBox className="formbox">
            <div>이메일</div>
            <TextField onChange={onChangeEmail} />
            {email.length > 0 && <TextP>{emailMessage}</TextP>}
          </FormBox>
          <FormBox className="formbox">
            <div>비밀번호</div>
            <TextField
              onChange={onChangePassword}
              title="비밀번호"
              type="password"
            />
            {password.length > 0 && (
              <TextP className={`message ${isPassword ? "success" : "error"}`}>
                {passwordMessage}
              </TextP>
            )}
          </FormBox>
          <FormBox className="formbox">
            <div>비밀번호 확인</div>
            <TextField
              onChange={onChangePasswordConfirm}
              title="비밀번호 확인"
              type="password"
            />
            {passwordConfirm.length > 0 && (
              <TextP
                className={`message ${isPasswordConfirm ? "success" : "error"}`}
              >
                {passwordConfirmMessage}
              </TextP>
            )}
          </FormBox>

          {/* 이름, 이메일, 패스워드, 패스워드 확인이 다 맞다면 주황버튼으로 */}
          <div>
            <section>
              <FootButton
                type="submit"
                disabled={!(isEmail && isPassword && isPasswordConfirm)}
              >
                회원가입
              </FootButton>
            </section>
          </div>
        </form>
      </BackGround>
    </>
  );
};

export default Signup;
const BackGround = styled.div`
  align-items: center;
  text-align: center;
  justify-content: center;

  margin-top: 200px;
`;

const Title = styled.div``;
const TextField = styled.input`
  width: 200px;
  height: 30px;
  padding: 5px;
  box-sizing: border-box;
  font-size: 15px;
`;

const FootButton = styled.button`
  width: 100px;
  height: 50px;
`;

const TextP = styled.p`
  font-size: 15px;
  margin-top: 0px;
`;
const FormBox = styled.div`
  position: relative;
  margin-bottom: 20px;
  font-size: 15px;
`;
