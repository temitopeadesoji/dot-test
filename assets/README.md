# ASSETS

This directory contains your un-compiled assets such as LESS, SASS, or JavaScript.

More information about the usage of this directory in the documentation:
https://nuxtjs.org/guide/assets#webpacked

**This directory is not required, you can delete it if you don't want to use it.**

 uploadedDocument: false,
      loading: false,
      draggingtrack: false,
      loadedTrack: false,
      dragging: false,
      theeArtists: this.$store.state.artists,
      theeAlbums: [],
      theeGenres: this.$store.state.genres,
      songDetails: {
        SongFile: "",
        Title: "",
        Credits: [],
        Songwriter: [],
        Lyric: "",
        Producer: [],
        CoverImage: "",
        ReleaseDate: new Date(),
        Genre: [],
        Featuring: [],
        duration: 0,
        isReleased: '',
        sort_title: '',
        collaborators: [],
        track_album_property: ''
      },
      validation: {
        SongFile: "",
        Title: "",
        Credits: "",
        Songwriter: "",
        Lyric: "",
        Producer: "",
        CoverImage: "",
        ReleaseDate: "valid-input",
        Genre: [],
        Featuring: ""
      },
      genres: this.$store.state.genres
    };