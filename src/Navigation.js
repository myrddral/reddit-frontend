import Logo from "./assets/logo.svg";
import Userinfo from "./assets/userinfo.png";

const Navigation = () => {
  return (
    <nav>
      <img
        src={Logo}
        style={{ height: 32, width: "auto", margin: 4, paddingLeft: 15 }}
        alt="website logo"
      />
      <img
        onClick={() => alert('Ez csak kamu elem, de szerintem láttad előre :P')}
        src={Userinfo}
        style={{ height: 43, width: "auto" }}
        alt="website logo"
      />
    </nav>
  );
};

export default Navigation;
