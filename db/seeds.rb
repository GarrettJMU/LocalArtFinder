# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user = User.create! :name => 'Bobby Joe', :email => '65@gmail.com', :password => 'password', :password_confirmation => 'password'

artistOne = user.artists.create!(artist_name: 'ED', first_name: 'Edgar', last_name: 'Degas', email: 'edgardegas@yahoo.com', password: 'password', street: '2625 Ashcraft', city: 'San Diego',state: 'CA',zipcode: '92103',website: 'www.edgardegas.com',sales: '', phone: '(760)210-1326')
artistTwo = user.artists.create!(artist_name: 'CP', first_name: 'Camille', last_name: 'Pissaro', email: 'camillepissaro@gmail.com', password: 'password', street: '2575 Willison Street',city: 'San Diego',state: 'CA',zipcode: '92111',website: 'www.camillepissaro.com',sales: '', phone: '(858)352-0001')
artistThree = user.artists.create!(artist_name: 'MC', first_name: 'Marc', last_name: 'Chagall', email: 'marcchagall@yahoo.com', password: 'password', street: '3484 Coleman Avenue',city: 'San Diego',state: 'CA',zipcode: '92103',website: 'www.marcchagall.com',sales: '', phone: '(858)541-6026')
artistFour = user.artists.create!(artist_name: 'MCA', first_name: 'Mary', last_name: 'Cassatt', email: 'marycassatt@gmail.com', password: 'password', street: '4003 Poplar Avenue',city: 'San Diego',state: 'CA',zipcode: '92111',website: 'www.marycassatt.com',sales: '', phone: '(760)522-5363')
artistFive = user.artists.create!(artist_name: 'PG', first_name: 'Paul', last_name: 'Gauguin', email: 'paulgauguin@yahoo.com', password: 'password', street: '480 Poplar Avenue',city: 'San Diego',state: 'CA',zipcode: '92103',website: 'www.paulgauguin.com',sales: '', phone: '(619)515-5115')

galleryOne = artistOne.galleries.create!(name: 'Exhibition of Art', website: 'www.ExhibitionOfArt.com', phone: '(619)264-8402', opening:'10:00:00', closing:'18:00:00', street:'325 15th Street', city:'San Diego', state:'CA', artist: artistOne, user: user, zipcode: '92101')
galleryTwo = artistTwo.galleries.create!(name: 'Art Hall', website: 'www.arthall.com', phone: '(760)271-1231', opening:'09:00:00', closing:'17:00:00', street:'1500 El Prado', city:'San Diego', state:'CA', artist: artistTwo, user:user, zipcode: '92101')
galleryThree = artistThree.galleries.create!(name: 'Vault of Glass
', website: 'www.VaultOfGlass.com', phone: '(619)602-5960', opening:'10:00:00', closing:'18:00:00', street:'1827 5th Ave', city:'San Diego', state:'CA', artist: artistThree, user: user, zipcode: '92101')
galleryFour = artistFour.galleries.create!(name: 'Creativity Centre
', website: 'www.CreativityCentre.com', phone: '(619)264-8402', opening:'09:00:00', closing:'17:00:00', street:'1040 7th Avenue', city:'San Diego', state:'CA', artist: artistFour, user: user, zipcode: '92101')
galleryFive = artistFive.galleries.create!(name: 'Expedition Gallery
', website: 'www.expeditiongallery.com', phone: '(858)472-2248', opening:'09:00:00', closing:'17:00:00', street:'1550 S El Camino Real', city:'Encinitas', state:'CA', artist: artistFive, user: user, zipcode: '92024')

img = File.open('app/assets/images/artistOne.jpg', 'rb')
img2 = File.open('app/assets/images/artistOnes.jpg', 'rb')
img3 = File.open('app/assets/images/artistTwo.jpg', 'rb')
img4 = File.open('app/assets/images/artistTwos.jpg', 'rb')
img5 = File.open('app/assets/images/artistThree.jpg', 'rb')
img6 = File.open('app/assets/images/artistThrees.jpg', 'rb')
img7 = File.open('app/assets/images/artistFour.jpg', 'rb')
img8 = File.open('app/assets/images/artistFours.jpg', 'rb')
img9 = File.open('app/assets/images/artistFive.jpg', 'rb')
img10 = File.open('app/assets/images/artistFives.jpg', 'rb')

artistOne.arts.create!(genre:'Interior', description:'Interior paintings/drawings typically exclude or de-emphasize the presence of people or pets.', price:200, length:30, width:40, medium:'Oil', artist: artistOne, user: user, image: img)
artistOne.arts.create!(genre:'Still Life', description:"Still lifes can be highly arranged sets of objects, casual arrangements, haphazard groupings, or, as in trompe l'oeil still lifes, some sort of planar surface is convincingly painted facing the viewer, and objects are carefully rendered as if they are attached to or suspended from this surface.
", price:250, length:20, width:24, medium:'Oil', artist: artistOne, user: user, image_file_name: img2)
artistTwo.arts.create!(genre:'Protrait', description:'Portraiture seeks to capture the essential identity of each character that is shown. Among other variations, portraits can be head studies, head and shoulders, head/shoulders/hands, or full body. With the focus on the character(s), any objects or settings shown in the painting/drawing might be seen as symbolic of the character(s) or perhaps providing context for the character(s).
', price:500, length:30, width:40, medium:'Gouache', artist: artistTwo, user: user, image: img3)
artistTwo.arts.create!(genre:'Figurative', description:'In figurative painting/drawings, character(s) are depicted in a context that removes the focus from capturing the essence of those portrayed. Character(s) can be real or imaginary, human or animal. As opposed to portraiture, heads might be turned away, faces might be de-emphasized, the figure might be painted within a scene that shares equal attention, the painting/drawing might portray characters as allegorical representations of an idea, or the characters might be treated as replaceable actors within a drama.
', price:1000, length:36, width:48, medium:'Gouache', artist: artistTwo, user: user, image: img4)
artistThree.arts.create!(genre:'Landscape', description:'Landscapes focus on natural scenes, from close-ups of plants in their natural setting, to trees on a hill, to farmland, to broad vistas and the skies above. Any architecture present is de-emphasized.
', price:80, length:18, width:24, medium:'Tempera', artist: artistThree, user: user, image: img5)
artistThree.arts.create!(genre:'Structures', description:'Painting/drawings that show towns, cities, homes, farms, emphasizing architecture and/or the functional/recreational spaces between buildings.
', price:750, length:36, width:48, medium:'Tempera', artist: artistThree, user: user, image: img6)
artistFour.arts.create!(genre:'Impressionism', description:'A central figure of the Impressionist circle, Berthe Morisot is known for both her compelling portraits and her poignant landscapes.', price:240, length:20, width:24, medium:'Fresco Painting', artist: artistFour, user: user, image: img7)
artistFour.arts.create!(genre:'Impresionism', description:'While the work of Gustave Caillebotte adheres to a distinctly realistic aesthetic that differs from most impressionistic renderings, his paintings reflect a similar concern with subjects of modern life.', price:350, length:24, width:36, medium:'Fresco Painting', artist: artistFour, user: user, image_file_name: img8)
artistFive.arts.create!(genre:'Realism', description:'At the same Salon of 1850-51 where he made waves with A Burial at Ornans, Courbet also exhibited The Stone Breakers. In the painting, which shows two workers, one young, one old, Courbet presented both a Realist snapshot of everyday life and an allegory on the nature of poverty.', price:645, length:18, width:24, medium:'Oil', artist: artistFive, user: user, image: img9)
artistFive.arts.create!(genre:'Realism', description:"Part of a 'trilogy' of paintings celebrating France's rural denizens, The Gleaners serves as something of a feminine pendant to Courbet's The Stone Breakers (1849-50).", price:890, length:30, width:40, medium:'Oil', artist: artistFive, user: user, image: img10)

artistOne.events.create!(start:'2017-10-28 18:00:00', end:'2017-10-28 21:00:00', gallery: galleryOne, artist: artistOne, user: user)
artistTwo.events.create!(start:'2017-10-28 19:00:00', end:'2017-10-28 22:00:00', gallery: galleryTwo, artist: artistTwo, user: user)
artistThree.events.create!(start:'2017-10-28 18:00:00', end:'2017-10-28 21:00:00', gallery: galleryThree, artist: artistThree, user: user)
artistFour.events.create!(start:'2017-10-28 19:00:00', end:'2017-10-28 22:00:00', gallery: galleryFour, artist: artistFour, user: user)
artistFive.events.create!(start:'2017-10-28 18:00:00', end:'2017-10-28 21:00:00', gallery: galleryFive, artist: artistFive, user: user)
