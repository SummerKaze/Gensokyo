import React, { useContext, useState, useEffect, useRef } from 'react'
import project_json from "../config/product"
import { Context } from "../store/menu"

export default function ProfilePage() {
    const { store } = useContext(Context)
    const [gifLoaded, setGifLoaded] = useState(false)
    const [shouldLoadGif, setShouldLoadGif] = useState(false)
    const gifRef = useRef(null)
    const workerRef = useRef(null)

    // 使用 Web Worker 和 Intersection Observer 优化 GIF 加载
    useEffect(() => {
        // 使用 Intersection Observer 检测元素是否进入视口
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !shouldLoadGif) {
                        // 延迟加载，避免阻塞主线程
                        setTimeout(() => {
                            setShouldLoadGif(true)
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
            if (workerRef.current) {
                workerRef.current.terminate()
            }
        }
    }, [shouldLoadGif])

    // GIF 加载完成后的处理 - 优化循环过渡
    useEffect(() => {
        if (gifRef.current && gifLoaded) {
            const gif = gifRef.current
            
            // 使用更温和的方法：在循环时添加轻微的透明度变化
            // 通过定期添加轻微的淡入淡出效果来减少循环跳转的视觉冲击
            let animationFrame = null
            let lastTime = Date.now()
            
            // 保存原始的 filter 样式
            const originalFilter = window.getComputedStyle(gif).filter || ''
            
            const smoothLoopTransition = () => {
                if (!gifRef.current) return
                
                const now = Date.now()
                const elapsed = now - lastTime
                
                // 每 2.8 秒（接近 GIF 循环时长）添加一次平滑过渡
                // 这个时间需要根据实际 GIF 时长调整（30 帧 GIF 通常是 2-3 秒）
                if (elapsed >= 2800) {
                    // 添加轻微的透明度变化，减少跳转感
                    gif.style.transition = 'opacity 0.25s ease'
                    gif.style.opacity = '0.92'
                    
                    setTimeout(() => {
                        if (gifRef.current) {
                            gifRef.current.style.opacity = '1'
                        }
                    }, 250)
                    
                    lastTime = now
                }
                
                animationFrame = requestAnimationFrame(smoothLoopTransition)
            }
            
            // 延迟启动，避免影响初始加载
            setTimeout(() => {
                smoothLoopTransition()
            }, 3000)
            
            return () => {
                if (animationFrame) {
                    cancelAnimationFrame(animationFrame)
                }
            }
        }
    }, [gifLoaded])

    const project = project_json.map(el =>
        <a href={el.link} key={el.id} target="_blank" rel="noopener noreferrer">
            <img src={el.thumb} alt={el.title} />
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
                {/* Chisato GIF 全屏背景 - 展示锦木千束与彼岸花 */}
                <div className="profile-chisato-bg">
                    <div className="chisato-overlay" />
                    {shouldLoadGif && (
                        <img 
                            ref={gifRef}
                            src="/images/Chisato_2k_30.gif" 
                            alt="锦木千束（Chisato）手持彼岸花 - Lycoris Recoil" 
                            className="chisato-gif"
                            loading="lazy"
                            decoding="async"
                            onLoad={() => {
                                setGifLoaded(true)
                            }}
                            onError={() => {
                                console.warn('GIF 加载失败')
                            }}
                            style={{ opacity: gifLoaded ? 1 : 0 }}
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