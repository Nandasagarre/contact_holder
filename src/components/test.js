import { useState } from 'react';



function APIcall() {

    const [items, setItem] = useState([]);
    const [myitems, setmyitems] = useState([]);

    //to fetch all conatcts
    let callThis = () => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then((res) => { setItem(res); console.log(res) });
    }


    //adds to my contact list
    let  saveContact = (id) => {
        console.log('id here', id)
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then(res => res.json())
            .then((res) => { 
                setmyitems([...myitems, res]);
            })
            
    }

    // delete to my contcts list
    let deleteMyContact = (id) => {
        
        setmyitems(myitems.filter((item) => { return item.id !== id }));
    }

    //update tthe contact
    let updateMyContact = (id) => {

        //make editable
        let x = document.getElementsByClassName(id);
        
        for (let i = 2; i >= 0; i--) {
            x[i].setAttribute("contentEditable", "true");
            x[i].style.backgroundColor = "#E5E0FF";
        }
    }

    //save edited contracts
    let saveMyContact = (id) => {
        let x = document.getElementsByClassName(id);
        for (let i = 2; i >= 0; i--) {
            x[i].setAttribute("contentEditable", "false");
            x[i].style.backgroundColor = "#8EA7E9";
        }
    }

    return (
       <>
            <>
                <button  onClick={callThis} className="btn btn-light fix">Get All Contacts</button>
            <div className="card move-right">
                {items.map(item => (
                    <div className="item" key={item.id}>
                        <div className="text">
                            {item.name} <br />
                            {item.username} <br />
                            {item.email} <br />
                            {item.phone} <br />
                            {item.website} <br />
                            <button id={item.id} onClick={() => saveContact(item.id)} className="btn btn-light">Add To My List</button>
                        </div>
                    </div>
                ))}
            </div>
           
            </>
            <div className="main_holder">
                <p>My Contact List</p>
            
           <div className="c_holder row">
                {myitems.map(item => (
                    <>
                        
                        <div className="card-body my_contacts col" key={`add+${item.id}`} id={`add+${item.id}`}>
                            <div className="take">{item.name}</div>
                            <div className="take">{item.username}</div>
                            <div className={`update+${item.id} take` }>{item.email}</div>
                            <div className={`update+${item.id} take` }>{item.phone}</div>
                            <div className={`update+${item.id} take` }>{item.website}</div> 
                        </div>


                            <div className="buttonary col mb-3">
                            <button className="btn btn-light border border-2 me-1" onClick={() => deleteMyContact(item.id)}>Delete</button>
                            <button className="btn btn-light border border-2 me-1" onClick={() => updateMyContact(`update+${item.id}`)}>Update</button>
                           <button className="btn btn-light border border-2" onClick={() => saveMyContact(`update+${item.id}`)}>Save</button>
                        </div>
                        
                        </>
                ))}
                        
                </div>
                
            </div>
        </>
        );

}

export default APIcall;