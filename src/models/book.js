const year = new Date().getFullYear();

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Book', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate : {
        notEmpty: { msg: "Title can't be empty." },
        notNull: { msg: "Title is required." },
        len : {
          args : [1, 100],
          msg : "Title must be between 1 and 100 characters long."
        },
        is : { 
          args : /^[a-zA-Z0-9À-ÖØ-öø-ÿ0-9 \-']+$/i,
          msg : "Title name can only contain letters, spaces, hyphens, and apostrophes."
        }
      }
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty: { msg: "Author can't be empty." },
        notNull: { msg: "Author is required." },
        len : {
          args : [1, 50],
          msg : "Author must be between 1 and 50 characters long."
        },
        is : {
          args : /^[a-zA-ZÀ-ÖØ-öø-ÿ \-']+$/i,
          msg : "Author name can only contain letters, spaces, hyphens, and apostrophes."
        }
      }
    },
    isbn: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate : {
        notEmpty: { msg: "ISBN can't be empty." },
        notNull: { msg: "ISBN is required." },
        len : {
          args : [13],
          msg : "ISBN must be 13 characters long."
        }
      }
    },
    publicationYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate : {
        isInt : { msg : "Publication year must be an integer." },
        notNull: { msg: "Publication year is required." },
        min : { 
          args: year-200,
          msg : `Publication year must be no earlier than ${year - 200}.`
        },
        max : {
          args: year,
          msg : `Publication year cannot be in the future.`
        }
      }
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notEmpty: { msg: "Genre can't be empty." },
        notNull: { msg: "Genre is required." },
        
        isGenreValid(value) {
          if (!value) {
            throw new Error("Genre is required.");
          }

          const genres = value.split(',')

          if (genres.length != 1) {
            throw new Error("A book must have between 1 and 4 genres.");
          }

          const validGenre = [ "Roman", "Dystopie", "Mystère Historique", "Post-Apocalyptique", "Thriller Psychologique", "Fiction Philosophique", "Science-Fiction", "Fantasy", "Mystery", "Thriller", "Non-Fiction", "Historical", "Young Adult", "Children", "Horror", "Self-Help", "Biography" ];

          genres.forEach( genre => {
            if (!validGenre.includes(genre)) {
              throw new Error(`Genre '${genre}' is not recognized.`);
            }
            
          });
        }
      }
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  })

  
}