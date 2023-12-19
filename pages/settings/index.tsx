import { useWeb3ReactManager } from "@web3-react/core/dist/manager";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import LoadingButton from "../../components/Buttons/LoadingButton";
import Form from "../../components/Form";
import RequiredFields from "../../components/Form/RequiredFields";
import TextInput from "../../components/Form/TextInput";
import Translate, { useTranslate } from "../../components/Text/Translate";
import { isEmail } from "../../hooks/helperFunctions";
import { useActiveWeb3React } from "../../hooks/web3";

interface SettingsProps {
  //get props
}

const Settings: React.FC<SettingsProps> = () => {
  const [username, setUsername] = useState<string>();
  const [usernameError, setUsernameError] = useState<string>();
  const [debouncedUsername] = useDebounce(username, 1000);

  const [bio, setBio] = useState<string>();

  const [email, setEmail] = useState<string>();
  const [emailError, setEmailError] = useState<string>();
  const [debouncedEmail] = useDebounce(email, 1000);

  const [links, setLinks] = useState(); //???
  const [walletAddress, setWalletAddress] = useState(); //???

  const [typing, setTyping] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { library, account, chainId } = useActiveWeb3React();

  // translations
  const usernamePlaceholder = useTranslate("username_placeholder");
  const emailPlaceholder = useTranslate("email_placeholder");
  const requiredError = useTranslate("required_fields");
  const usernameTaken = useTranslate("username_taken");
  const emailTaken = useTranslate("email_taken");
  const emailInvalid = useTranslate("email_invalid");

  //fetch data, set everything
  useEffect(() => {}, []);

  //lookup name from server
  useEffect(() => {
    if (debouncedUsername && debouncedUsername == "osman")
      setUsernameError(usernameTaken);
    setTyping(false);
  }, [debouncedUsername]);

  //lookup email from server
  useEffect(() => {
    if (debouncedEmail && !isEmail(debouncedEmail)) setEmailError(emailInvalid);
    else if (debouncedEmail == "osmancanozkan1@gmail.com")
      setEmailError(emailTaken);
    setTyping(false);
  }, [debouncedEmail]);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTyping(true);
    const temp = e.currentTarget.value;
    setUsername(temp);
    if (!temp) setUsernameError(requiredError);
    else setUsernameError(undefined);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTyping(true);
    const temp = e.currentTarget.value;
    setEmail(temp);
    if (!temp) setEmailError(requiredError);
    else setEmailError(undefined);
  };

  const handleSubmit = () => {};

  return (
    <section className="container content py-6" style={{ maxWidth: 720 }}>
      <h1 className="is-title is-size-1">
        <Translate keyword="profile_settings" />
      </h1>
      <RequiredFields />
      <Form label="username" required>
        <input
          className="input"
          type="text"
          placeholder={usernamePlaceholder}
          onChange={handleUsernameChange}
          value={username}
        />
        {usernameError && (
          <small className="has-text-danger">{usernameError}</small>
        )}
      </Form>
      <Form label="bio">
        <textarea
          className="textarea"
          onChange={(e) => setBio(e.currentTarget.value)}
          value={bio}
        ></textarea>
      </Form>
      <Form label="email" required>
        <input
          className="input"
          type="text"
          placeholder={emailPlaceholder}
          onChange={handleEmailChange}
          value={email}
        />
        {emailError && <small className="has-text-danger">{emailError}</small>}
      </Form>

      <LoadingButton
        className="button is-info is-fullwidth"
        loading={loading}
        onClick={handleSubmit}
        disabled={typing || !username || !email || usernameError || emailError}
      >
        <Translate keyword="update_profile" />
      </LoadingButton>
    </section>
  );
};

export default Settings;

export async function getServerSideProps({ query, route }: any) {
  //can't fetch here, need hooks
  //const user = fetch(account);

  return {
    props: {
      //return props
    },
  };
}
