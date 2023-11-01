const backToList=()=>{
    localStorage.removeItem('currentContact');
    location.reload();
}

const back = document.getElementById('back-btn');
back.addEventListener('click', () => {
    backToList();
});

let details;
const nameLabel=document.getElementById('name-label');
const phoneLabel=document.getElementById('phone-label');
phoneLabel.disabled=true;
nameLabel.disabled=true;

const contactRequest=new FXMLHttpRequest();
contactRequest.open('GET',`/api/users/${localStorage.getItem('currentUser')}/contacts/${localStorage.getItem('currentContact')}`);
contactRequest.onload=function(){
    details=JSON.parse(this.requestText);
    nameLabel.value=details.name;
    phoneLabel.value=details.phone;
};
contactRequest.send();

const deleteBtn = document.getElementById('delete-btn');
deleteBtn.addEventListener('click', () => {
    const deleteRequest=new FXMLHttpRequest();
    deleteRequest.open('DELETE',`/api/users/${localStorage.getItem('currentUser')}/contacts/${localStorage.getItem('currentContact')}`);
    deleteRequest.onload=function(){
        backToList();
    };
    deleteRequest.send();
});

const updateBtn = document.getElementById('update-btn');
updateBtn.addEventListener('click', () => {
    phoneLabel.disabled=false;
    nameLabel.disabled=false;
});

const commitBtn = document.getElementById('commit-btn');
commitBtn.addEventListener('click', ()=>{
    const updateRequest=new FXMLHttpRequest();
    updateRequest.open('PUT',`/api/users/${localStorage.getItem('currentUser')}/contacts/${localStorage.getItem('currentContact')}`, {
        id: localStorage.getItem('currentContact'),
        name: nameLabel.value,
        phone: phoneLabel.value
    });
    updateRequest.onload=function(){
        location.reload();
    };
    updateRequest.send();
})
