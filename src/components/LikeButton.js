import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Button, Label, Icon } from "semantic-ui-react";

import CommonPopup from "../util/CommonPopup";

function LikeButton({ user, post: { id, likeCount, likes }}) {
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if(user && likes.find(like => like.username === user.username)) {
            setLiked(true)
        } else setLiked(false)
    }, [user, likes]);

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: { postId: id }
    });

    const likeButton = user ? (
        liked ? (
            <Button color='teal'>
                <Icon name='thumbs up' />
            </Button>
        ) : (
            <Button color='teal' basic>
                <Icon name='thumbs up' />
            </Button>
        )
    ) : (
        <Button as={Link} to="/login" color='teal' basic>
            <Icon name='thumbs up' />
        </Button>
    )

    return (
        <Button as='div' labelPosition='right' onClick={likePost}>
            <CommonPopup content={liked ? "Unlike" : "Like this!"}>{likeButton}</CommonPopup>
            <Label basic color='teal' pointing='left'>
                {likeCount}
            </Label>
        </Button>
    )
}

const LIKE_POST_MUTATION = gql`
    mutation likePost($postId: ID!) {
        likePost(postId: $postId) {
            id
            likes {
                id username
            }
            likeCount
        }
    }
`;

export default LikeButton;