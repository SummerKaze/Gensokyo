import React, { useContext } from "react";
import { Context } from "../store/menu";

/**
 * 首页组件
 * 展示锦木千束（Chisato）的 GIF 动画
 * 主题：Lycoris Recoil - 锦木千束与彼岸花
 */
export default function HomePage() {
  const { store, dispatch } = useContext(Context);

  return (
    <div id="index-page">
      <div className="index-bg">
        <span />
        <span />
        <span />
      </div>
      <div className="index-logo">
        <div className="logo-main">
          <div className="logo-chars-row">
            <span className="logo-char logo-char-first">な</span>
            <span className="logo-char logo-char-with-sub">
              つ
              <span className="logo-sub-text logo-sub-below">Summer</span>
            </span>
            <span className="logo-char">の</span>
            <span className="logo-char-group-wrapper">
              <span className="logo-sub-text logo-sub-above">Gensōkyō</span>
              <span className="logo-char-group">
                <span className="logo-char logo-char-misaligned-1">幻</span>
                <span className="logo-char logo-char-misaligned-2">想</span>
                <span className="logo-char logo-char-misaligned-3">郷</span>
              </span>
            </span>
          </div>
        </div>
        <div className="logo-line">
          <span className="logo-asterisk">✱</span>
          <div className="logo-line-thick"></div>
          <div className="logo-line-thin"></div>
        </div>
      </div>
      <div
        id="index-button"
        data-state={store.dataState}
        onClick={() => dispatch({ type: "switch" })}
      >
        <div className="btn-bg" />
        <div className="btn-main">
          <div className="short-id short-id-1">
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="short-id short-id-2">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
      <div className="index-sns">
        <div className="inner">
          <a
            href="https://github.com/SummerKaze"
            title="GitHub"
            rel="noopener noreferrer"
          >
            <i className="czs-github-logo" />
          </a>
          <a href="https://github.com/xiaobaigroup" title="xiaobaigroup" rel="noopener noreferrer">
            <i className="czs-pokemon-ball" />
          </a>
          <a href="https://github.com/XHXYT/AnimeZ" title="AnimeZ" rel="noopener noreferrer">
            <i className="czs-chemistry" />
          </a>
          <a
            href="https://developer.huawei.com/consumer/cn/personalcenter/myCommunity/communityPublish/post?uid=e092bbab8c7c4f5f91154451868d4495"
            title="HuaWei"
            rel="noopener noreferrer"
          >
            <i className="huawei-icon" />
          </a>
          <a
            href="https://steamcommunity.com/id/SummerKaze/"
            title="Steam"
            rel="noopener noreferrer"
          >
            <i className="czs-steam" />
          </a>
        </div>
      </div>
    </div>
  );
}
