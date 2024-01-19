import React from 'react'
import './home.css'
import Main from './Main'



function Home() {



    return (
        <>
            <div className='cover'>
                <div className='SideBar'>
                    <div className='first'>
                        <div className='group'>
                            <div className='nom'>
                                <img src="./home-5-64.png" alt="" width="28px" />
                                <h2>Home</h2>
                            </div>
                            <div className='nome'>
                                <img src="./search-3-64.png" alt="" width="28px" />
                                <input type="search" name="" id="" placeholder='Search....' />
                            </div>
                        </div>
                    </div>



                    <div className="second">
                        <div className='library'>
                            <img src="./icons8-library-96.png" alt="" width="28px" />
                            <button>Your Library</button>
                        </div>



                        <div>
                            <div className='wd_1'>
                                <p>Create your first play list</p>
                                <p>it's easy we will help you</p>
                                <button>Create Playlist</button>
                            </div>
                            <div className='wd_1'>
                                <p>Lets find some podcast to follow</p>
                                <p>We'll keep you updated</p>
                            </div>
                        </div>




                        <div className='legal'>
                            <ul >
                                <li>Legal</li>
                                <li>PrivacyCenter</li>
                                <li>PrivacyPolicy</li>
                                <li>cookies</li>
                            </ul>
                        </div>
                        <div className='legal2'>
                            <ul>
                                <li>AboutAds</li>
                                <li>Accesibility</li>
                            </ul>
                        </div>
                        <p style={{ fontSize: "13px", marginLeft: "25px", color: "white", marginTop: "10px" }}>Cookies</p>


                        <select name="language" id="language">
                            <option value="English">English</option>
                            <option value="Hindi">Hindi</option>
                            <option value="French">French</option>
                        </select>
                    </div>


                </div>


                {/* main content */}
                <div className='Mein'>
                    <Main />
                </div>
            </div>
        </>
    )
}

export default Home