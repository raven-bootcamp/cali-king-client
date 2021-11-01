import { Popup } from "semantic-ui-react";

function CommonPopup({ content, children }) {
    return <Popup inverted content={content} trigger={children} />
}

export default CommonPopup;