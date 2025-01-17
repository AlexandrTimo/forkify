export default class Likes {
    constructor ()
    {
        this.likes = [];
    }

    addLike (id, title, author, img)
    {
        const like = {
            id,
            title,
            author,
            img
        };
        this.likes.push(like);
        this.persistData();
        return like;

        
    };

    deleteLike (id)
    {
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1);

        // Persist data in in local storage
        this.persistData();
    };

    isLiked (id)
    {
        return this.likes.findIndex(el => el.id === id) !== -1;
    };

    getNumberOfLikes ()
    {
        return this.likes.length;
    }

    // Add data to localStorage
    persistData ()
    {
        localStorage.setItem('Likes', JSON.stringify(this.likes));
    }

    // Take data back to the object
    readStorage ()
    {
        const storage = JSON.parse(localStorage.getItem('Likes'));

        // Restoring likes data from local storage
        if (storage) this.likes = storage;
    }
};