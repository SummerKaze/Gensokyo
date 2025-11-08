import React, { useContext, useState, useEffect, useRef } from 'react'
import project_json from "../config/product"
import { Context } from "../store/menu"

export default function ProfilePage() {
    const { store } = useContext(Context)
    const [videoLoaded, setVideoLoaded] = useState(false)
    const [shouldLoadVideo, setShouldLoadVideo] = useState(false)
    const videoRef = useRef(null)

    // 使用 Intersection Observer 优化视频加载
    useEffect(() => {
        // 使用 Intersection Observer 检测元素是否进入视口
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !shouldLoadVideo) {
                        // 延迟加载，避免阻塞主线程
                        setTimeout(() => {
                            setShouldLoadVideo(true)
                        }, 500)
                        observer.disconnect()
                    }
                })
            },
            {
                root: null,
                rootMargin: '50px', // 提前 50px 开始加载
                threshold: 0.1
            }
        )

        // 观察 description-box 元素
        const descriptionBox = document.querySelector('.description-box')
        if (descriptionBox) {
            observer.observe(descriptionBox)
        }

        return () => {
            observer.disconnect()
        }
    }, [shouldLoadVideo])

    // 视频加载完成后的处理
    useEffect(() => {
        if (videoRef.current && shouldLoadVideo) {
            const video = videoRef.current
            
            // 视频加载完成后显示
            const handleCanPlay = () => {
                setVideoLoaded(true)
                video.play().catch(err => {
                    console.warn('视频自动播放失败:', err)
                })
            }
            
            video.addEventListener('canplay', handleCanPlay)
            
            return () => {
                video.removeEventListener('canplay', handleCanPlay)
            }
        }
    }, [shouldLoadVideo])

    const project = project_json.map(el =>
        <a href={el.link} key={el.id} target="_blank" rel="noopener noreferrer">
            <div className="project-thumb">
                <img src={el.thumb} alt={el.title} />
            </div>
            <h4>{el.title}</h4>
            <p>{el.intro}</p>
            <time>{el.time}</time>
        </a>
    )

    return (
        <div id="profile-page" data-state={ store.dataState }>
            {/* header-box */}
            <section className="header-box">
                <div className="header" />
            </section>

            {/* description-box */}
            <section className="description-box">
                {/* Chisato 视频全屏背景 - 展示锦木千束与彼岸花 */}
                <div className="profile-chisato-bg">
                    <div className="chisato-overlay" />
                    {shouldLoadVideo && (
                        <video 
                            ref={videoRef}
                            src="/images/Chisato_2k.mp4" 
                            className="chisato-gif"
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="auto"
                            onError={(e) => {
                                console.warn('视频加载失败')
                            }}
                            style={{ opacity: videoLoaded ? 1 : 0 }}
                        />
                    )}
                </div>
                <div className="avatar">
                    <a 
                        href="https://github.com/SummerKaze" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="avatar-link"
                    />
                </div>
                <div className="author">
                    <a 
                        href="https://github.com/SummerKaze" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="author-link"
                    >
                        SummerKaze
                    </a>
                </div>
                <div className="description">
                    {'\u00A0'}{'\u00A0'}✈️ 用代码雕刻未来
                    <br/><br/>
                    {'\u00A0'}{'\u00A0'}专注于鸿蒙开发与创意编程，热爱新的交互体验、动画设计与UX设计。在代码的世界里，用创意点亮每一个想法。
                </div>
            </section>

            {/* information-box */}
            <section className="information-box">
                <div className="title">Information</div>
                <div className="information">
                    <div className="inner">
                        <p>ID：SummerKaze</p>
                        <p>兴趣：鸿蒙开发、创意编程、动画设计</p>
                        <p>最喜欢的颜色：<span style={{color: '#c52635'}}>#c52635</span></p>
                        <p>GitHub：<a href="https://github.com/SummerKaze" target="_blank" rel="noopener noreferrer" style={{color: '#8b4f95', textDecoration: 'none'}}>github.com/SummerKaze</a></p>
                    </div>
                </div>
            </section>

            {/* project-box */}
            <section className="project-box">
                <div className="title">Project</div>
                <div className="project">
                    { project }
                </div>
            </section>

            {/* afterwords-box */}
            <section className="afterwords-box">
                <div className="title">Afterwords</div>
                <div className="paragraph">
                    {'\u00A0'}{'\u00A0'}感谢{' '}
                    <a 
                        href="https://github.com/xiaobaigroup" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="xiaobai-link"
                    >
                        <img 
                            src="https://avatars.githubusercontent.com/u/192512939?s=200&v=4" 
                            alt="小白工坊" 
                            className="xiaobai-avatar"
                        />
                        小白工坊
                    </a>
                    {' '} 一起探索科技并用创造的快乐的美好。也感谢一直陪伴在我身边的人，我的每一段日常都是我的灵感来源。
                    <br/><br/>
                    "探求真理者不可心存傲慢。"
                </div>
            </section>

            {/* footer-box */}
            <section className="footer-box">
                <div className="footer">
                    <span>©{(new Date()).getFullYear()} SummerKaze. All rights reserved.</span>
                    <br/>
                    <span className="original-project">
                        Original project: <a href="https://github.com/iCyris/Gensokyo" target="_blank" rel="noopener noreferrer">Gensokyo</a> by <a href="https://github.com/iCyris" target="_blank" rel="noopener noreferrer">Cyris</a>
                    </span>
                </div>
            </section>
        </div>
    )
}