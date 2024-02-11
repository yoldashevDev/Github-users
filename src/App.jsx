import { useEffect, useState } from "react";

import "./App.css";
import { FaSearch, FaTwitter, FaLink } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineWbSunny } from "react-icons/md";
import { MdOutlineMapsHomeWork } from "react-icons/md";
import Loading from "./components/loading/Loading";

function App() {
  const [name, setName] = useState("octokat");
  const [nightmode, setNightmode] = useState(true);

  const [contactData, setContactData] = useState([]);
    const [loading, setLoading] = useState(false);

  const getData = async (link) => {
        setLoading(true);
    const req = await fetch(link);
    const data = await req.json();
    setContactData([data]);
        setLoading(false);
  };

 useEffect(()=>{
  getData("https://api.github.com/users/octokat")
 }, [])
  return (
    <div className={nightmode ? "body night" : "body"} >
      {loading && <Loading/>}
      <div className="container">
        <nav>
          <div className="logo">
            <h1>devfinder</h1>
          </div>
          <div className="mode" onClick={()=>{
            setNightmode(!nightmode)
          }}>
            <span>Mode</span>
            <MdOutlineWbSunny />
          </div>
        </nav>
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
            getData(`https://api.github.com/users/${name}`);
          }}
        >
          <div className="input_box">
            <span>
              <FaSearch />
            </span>
            <input
              type="text"
              placeholder="Search GitHub username…"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <button>Search</button>
        </form>
      </div>

      <div className="container">
        {contactData.map((item) => {
          return (
            <div className="cards">
              <div className="left">
                <img src={item.avatar_url} alt="" />
              </div>
              <div className="right">
                <div className="about_contact">
                  <div className="box1">
                    <h1>The {item.login}</h1>
                    <span>@{item.login}</span>
                    <p>{item.bio ? item.bio : "This profile has no bio"}</p>
                  </div>
                  <div className="box2">
                    <p>{item.created_at?.slice(0, 10)}</p>
                  </div>
                </div>
                <div className="boxes">
                  <div className="box">
                    <span>Repos</span>
                    <h2>{item.public_repos}</h2>
                  </div>
                  <div className="box">
                    <span>Followers</span>
                    <h2>{item.followers}</h2>
                  </div>
                  <div className="box">
                    <span>Following</span>
                    <h2>{item.following}</h2>
                  </div>
                </div>
                <div className="social_media">
                  <div className="card">
                    <span>
                      <IoLocationSharp />
                      {item.location ? item.location : " San Francisco"}
                    </span>
                  </div>
                  <div className="card">
                    <a href={item.twitter_username ? item.twitter_username : "#"} target="_blank">
                      <FaTwitter />
                      {item.twitter_username
                        ? item.twitter_username
                        : "  Not Available"}
                    </a>
                  </div>
                  <div className="card">
                    <a href={item.blog ? item.blog : "#"} target="_blank">
                      <FaLink />
                      {item.blog ? item.blog?.slice(0, 14) : "https://github.blog"}...
                    </a>
                  </div>
                  <div className="card">
                    <span>
                     <MdOutlineMapsHomeWork/>
                      {item.company ? item.company?.slice(0, 15) : "@github"}...
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
