    var PUser = mongoose.model('PowerUsers', userSchema);

    // Creating one user.
    var johndoe = new PUser ({
      name: { first: 'John', last: '  Doe   ' },
      age: 25
    });

    // Saving it to the database.
    johndoe.save(function (err) {if (err) console.log ('Error on save!')});
