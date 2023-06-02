import React from "react";
import { ReactComponent as Logo } from "../static/logo.svg";
import { ReactComponent as Card } from "../static/card.svg";
import { ReactComponent as Feedback } from "../static/feedback.svg";
import { ReactComponent as Contact } from "../static/contact.svg";
import { ReactComponent as Add } from "../static/add.svg";
import { ReactComponent as MyForm } from "../static/myform.svg";
import { ReactComponent as DeleteBoxIcon } from "../static/delete.svg";
import { ReactComponent as OpenPageIcon } from "../static/open_link.svg";
import { ReactComponent as FolderIcon } from "../static/folder.svg";
import { ReactComponent as PreviewFormIcon } from "../static/preview_page.svg";
import { ReactComponent as PublishFormIcon } from "../static/publish_form.svg";
import { ReactComponent as ResultSheetIcon } from "../static/result_sheet.svg";
import { ReactComponent as MobileHome } from "../static/homeMobile.svg";
import { ReactComponent as MobileAdd } from "../static/addMobile.svg";
import { ReactComponent as MobileForms } from "../static/myformsMobile.svg";
import { ReactComponent as TextIcon } from "../static/text.svg";
import { ReactComponent as CheckBoxIcon } from "../static/checkbox.svg";
import { ReactComponent as RadioIcon } from "../static/radio.svg";
import { ReactComponent as EmailIcon } from "../static/email.svg";
import { ReactComponent as SelectIcon } from "../static/select.svg";
import { ReactComponent as TextareaIcon } from "../static/textarea.svg";

const SVGUtils = (props) => {
  switch (props.name) {
    case "logo":
      return <Logo />;
    case "card":
      return <Card />;
    case "add":
      return <Add />;
    case "contact":
      return <Contact />;
    case "feedback":
      return <Feedback />;
    case "myform":
      return <MyForm />;
    case "delete":
      return <DeleteBoxIcon />;
    case "openpage":
      return <OpenPageIcon />;
    case "folder":
      return <FolderIcon />;
    case "previewform":
      return <PreviewFormIcon />;
    case "publishform":
      return <PublishFormIcon />;
    case "resultsheet":
      return <ResultSheetIcon />;
    case "MobileHome":
      return <MobileHome />;
    case "MobileAdd":
      return <MobileAdd />;
    case "MobileForms":
      return <MobileForms />;
    case "Email":
      return <EmailIcon />;
    case "Text":
      return <TextIcon />;
    case "Radio":
      return <RadioIcon />;
    case "Checkbox":
      return <CheckBoxIcon />;
    case "Select":
      return <SelectIcon />;
    case "Textarea":
      return <TextareaIcon />;
    default:
      return <></>;
  }
};

export default SVGUtils;
