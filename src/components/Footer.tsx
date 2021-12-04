import styled from 'styled-components';
import { useContext } from "react";
import { ModalContext } from "../context/modal";
import HelpIcon from '@mui/icons-material/Help';
import IconLink from './common/IconLink';


function Footer() {
  const { setModal } = useContext(ModalContext);

  return (
    <FooterContainer>
      <IconLink iconLinkProps={{onClick: () => setModal({modal: 'help'})}}><HelpIcon /></IconLink>
    </FooterContainer>
  );
}

export default Footer;

const FooterContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`;