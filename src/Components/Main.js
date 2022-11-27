import {useState} from "react";
import { useEffect } from "react";
import Card from "./Card";
let API_key="&api_key=db95773a7fb212ba790d71f6adac0e7e";
let base_url="https://api.themoviedb.org/3";
let url=base_url+"/discover/movie?sort_by=popularity.desc"+API_key;
let arr=["Popular", "Theatre", "Coming Soon","Trending","Top Rated","Top Rated Indian"];
const Main=()=>{
    const [movieData,setData]=useState([]);
    const [url_set,setUrl]=useState(url);
    const [search,setSearch]=useState();
    useEffect(()=>{
        fetch(url_set).then(res=>res.json()).then(data=>{
            setData(data.results);
        });
    },[url_set])

    const getData=(movieType)=>{
        if(movieType==="Popular")
        {
            url=base_url+"/discover/movie?page=5&sort_by=popularity.desc"+API_key;
        }
        if(movieType==="Theatre")
        {
            url=base_url+"/discover/movie?primary_release_date.gte=2022-11-01"+API_key;
        }
        if(movieType==="Trending")
        {
            url=base_url+"/trending/all/day?"+API_key;
        }
        if(movieType==="Top Rated")
        {
            url=base_url+"/movie/top_rated?page=10"+API_key;
        }
        if(movieType==="Top Rated Indian")
        {
            url=base_url+"/discover/movie?&sort_by=popularity.desc&region=IN&language=hi-IN&release_date.gte=2022-01-01&with_release_type=3|2&with_original_language=hi"+API_key
            //url=base_url+"/discover/movie?with_origin_country=IN&sort_by=vote_average.desc&"+API_key
        }
        if(movieType==="Coming Soon")
        {
            url=base_url+"/movie/upcoming?"+API_key;
        }
        setUrl(url);

    }
    const searchMovie=(evt)=>{
        if(evt.key==="Enter")
        {
            url=base_url+"/search/movie?api_key=db95773a7fb212ba790d71f6adac0e7e&query="+search;
            setUrl(url);
            setSearch(search);
        }
    }
    return(
        <>
            <div className="header">
                <nav>
                    <ul>
                        {
                            arr.map((value,pos)=>{
                                return(
                                    <li><a href="#" key={pos} name={value} onClick={(e)=>{getData(e.target.name)}}>{value}</a></li>
                                )
                            })
                        }
                       
                    </ul>
                </nav>
                <form>
                    <div className="search-btn">
                        <input type="text" placeholder="Enter Movie Name" 
                        className="inputText" onChange={(e)=>{setSearch(e.target.value)}} 
                        value={search} onKeyPress={searchMovie}>
                        </input>
                        <button><i className="fas fa-search"></i></button>
                    </div>
                </form>
            </div>
            <div className="container">
                {
                    (movieData.length===0)?<p className="notfound">Not Found</p>: movieData.map((res,pos)=>{
                        return(
                            <Card info={res} key={pos}/>
                        )
                    })
                }
            </div>
        </>
    )
}
export default Main;