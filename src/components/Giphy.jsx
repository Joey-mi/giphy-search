import React, {useEffect, useState} from "react";
import axios from "axios";
import Loading from "./Loading";
import ErrExclaim from "./ErrExclaim";

const Giphy = () => {

    const [ranData, setRanData] = useState([]);
    const [ranGif, setRanGif] = useState([]);
    const [ranUser, setRanUser] = useState([]);
    const [search, setSearch] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);
            try {
                const results = await axios("https://api.giphy.com/v1/gifs/random", {
                    params: {
                        api_key: "RHp7aEVUnGtBZcDfxUdDwoMlAldgDK67"
                    }
                });
                 
                console.log(results); 
                setRanData(results.data.data);
                setRanGif(results.data.data.images.original);
                setRanUser(results.data.data.user);
            } catch (err) {
                setIsError(true);
                console.log(err);
            }
           
            setIsLoading(false);
        };

        fetchData();
    }, []);

    const renderRandGif = () => {
        if(isLoading) {
            return <Loading />;
        }

        if(isError) {
            return <ErrExclaim />;
        }
        // return ranData.map(el => {
        //     return (
        //         <div key={el.id} className="gif">
        //             <img src={el.images.fixed_height.url} />
        //         </div>
        //     );
        // });
        if (ranData.username === "") {
            return (
                <div>
                    <div className="container-gif">
                        <div key={ranData.id} className="gif">
                            <img src={ranGif.url} alt={ranData.title}/>
                        </div>
                    </div>
                    <div className="search-container info">
                        <h4 className="nouser">Gif uploaded by an anonymous user</h4>
                    </div>
                </div>
            );

        } else {
            return (
                <div>
                    <div className="container-gif">
                        <div key={ranData.id} className="gif">
                            <img className="main-gif-constraints" src={ranGif.url} alt={ranData.title}/>
                        </div>
                    </div>
                    <div className="search-container info">
                        <img className="pfp" src={ranUser.avatar_url} alt="profile pic"/>
                        <h4 className="user">{ranUser.display_name}</h4>
                        <a className="profile" href={ranUser.profile_url}>Like this gif? Visit {ranUser.display_name}'s' profile!</a>
                    </div>
                </div>
            );
        }
    };

    const handleSearchChange = event => {
        setSearch(event.target.value);
    };

    const handleSubmit = async event => {
        event.preventDefault(); // don't want page reload on submit
        setIsError(false);
        setIsLoading(true);
        var chosen_rating;

        if (document.querySelector('input[name="rating"]:checked') != null) {
            chosen_rating = document.querySelector('input[name="rating"]:checked').value;
        } else {
            chosen_rating = "g";
        }

        // if(document.getElementById('rating G').checked) {
        //     chosen_rating = 'g';
        // }else if(document.getElementById('rating PG').checked) {
        // //Female radio button is checked
        // } else if (document.getElementById('rating PG-13').checked) {

        // } else if (document.getElementById('rating R').checked) {

        // } else if (document.getElementById('rating any').checked) {

        // } else {

        // }

        try {
            // const results = await axios("https://api.giphy.com/v1/gifs/search", {
            //     params: {
            //         api_key: "RHp7aEVUnGtBZcDfxUdDwoMlAldgDK67",
            //         q: search
            //     }
            // });

            const results = await axios("https://api.giphy.com/v1/gifs/random", {
                params: {
                    api_key: "RHp7aEVUnGtBZcDfxUdDwoMlAldgDK67",
                    tag: search,
                    rating: chosen_rating
                }
            });

            // console.log(document.querySelector('input[name="rating"]:checked').value); 
            console.log(results); 
            setRanData(results.data.data);
            setRanGif(results.data.data.images.original);
            setRanUser(results.data.data.user);
        } catch (err) {
            setIsError(true);
            console.log(err);
        }
        setIsLoading(false);
    };

    return (
        <div className="m-2">
            <form className="form-inline justify-content-center m-2" >
                <div className="search-container">
                    <input type="text" placeholder="Search" 
                    className="form-control" onChange={handleSearchChange}
                    value={search} />

                    <button onClick={handleSubmit} type="submit" className="btn btn-primary mx-2">Generate</button>
                </div>
                <div className="search-container">
                    <label className="content-rate">Content Ratings: </label>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="rating" id="rating G" value="g" />
                        <label class="form-check-label content-rate" for="rating G">G</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="rating" id="rating PG" value="pg" />
                        <label class="form-check-label content-rate" for="rating PG">PG</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="rating" id="rating PG-13" value="pg-13" />
                        <label class="form-check-label content-rate" for="rating PG-13">PG-13</label>
                    </div>
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="rating" id="rating R" value="r" />
                        <label class="form-check-label content-rate" for="rating R">R</label>
                    </div>
                </div>             
            </form>
            <div>{renderRandGif()}</div>
            {/* <h6>Like this gif? Try checking out t</h6> */}
        
            {/* <p>{document.getElementsByName("rating").value}</p> */}
        </div>
    );

};

export default Giphy;