import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const PostCardContent = ({ postData }) => (
    <div>
        {postData.toString().split(/(#[^/s#]+)/g).map( (v, i) => {
            if (v.match(/(#[^/s#]+)/g)) {
                return <Link key={i} href={`/hashtag/${v.slice(1)}`}>{v}</Link>
            }
            return v;
        })}
    </div>

)

PostCardContent.propTypes = {
    postData: PropTypes.string.isRequired,
  };
  
export default PostCardContent;