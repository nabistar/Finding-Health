// 기본참조객체
import React from "react";
// SEO 처리 기능 패키지
import { Helmet, HelmetProvider } from "react-helmet-async";

/**
 * SEO 처리 컴포넌트
 * @params props
 * @returns {JSX.Element}
 */

const Meta = (props) => {
  return (
    <HelmetProvider>
      <Helmet>
        <meta charset="utf-8" />
        <title>{props.title}</title>
        {/* SEO 태그 */}
        <meta name="description" content={props.description} />
        <meta name="keywords" content={props.keywords} />
        <meta name="author" content={props.author} />
        <meta name="subject" content={props.subject} />
        <meta name="copyright" content={props.copyright} />
        <meta name="content-language" content="ko" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={props.title} />
        <meta property="og:description" content={props.description} />
        <meta property="og:image" content={props.image} />
        <meta property="og:url" content={props.url} />
        <link rel="icon" href={props.icon} type="image/png" />
        <link rel="shortcut icon" href={props.shortcutIcon} type="image/png" />
        <link
          rel="apple-touch-icon"
          href={props.appleTouchIcon}
          type="image/png"
        />
      </Helmet>
    </HelmetProvider>
  );
};

/**
 * props에 대한 기본값 설정
 * @type {{keywords: string, author: string, description: string, title: string, url: string}}
 */

Meta.defaultProps = {
  title: "건강 찾기",
  description: "국가 건강 검진 기관 찾기",
  keywords: "React",
  author: "hana",
  subject: "포트폴리오",
  copyright: "hana",
  image: null,
  url: null,
  icon: null,
  shortcutIcon: null,
  appleTouchIcon: null,
};

export default Meta;
