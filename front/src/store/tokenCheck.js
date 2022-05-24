import AuthService from "../../service/user/Auth.service";
import Router, { useRouter } from "next/router";

export default function tokenCheck(state) {
    if(state === 'invalid authority') {
        AuthService.logout();
        alert("세션이 만료되었습니다.")
        Router.push("/")
    }
}