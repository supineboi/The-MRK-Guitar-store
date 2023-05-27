// Fetching API 
let api = fetch('https://mocki.io/v1/4d947516-e382-4ec3-a233-151c62af4bb4')

// Preparing UI of Item Cards
function makeItemCards(item){
            // Preparing Item Box
            let item_container = document.createElement('div')
            item_container.classList.add('items')
    
            item_container.innerHTML = `<img src="${item.image}" alt="">
            <span>Make : <span class="make">${item.make}</span></span>
            <span>Model : <span class="model">${item.model}</span></span>
            <span>Type : <span class="type">${item.type}</span></span>
            <span>Price : <span class="price">${item.price}</span></span>`
            
            // Appending Item Box into a container
            $('.container').append(item_container)
}

api.then( (response) => response.json())
.then( (data) => {

    // filtered Option Unique entries array
    let make = []
    let model = []
    let type = []
    let price = []

    let count = 0;
    count = data.length;
    $(".count").text(count);

    // Iterating over all the data
    for(let i=0;i<data.length;i++){

        let item = data[i]
        makeItemCards(item);
        
        // Preparing Filter DropDown (by checking same option)
        if(!make.includes(item.make))
        $('#select-make').append(`<option value="${item.make}">${item.make}</option>`)
        if(!model.includes(item.model))
        $('#select-model').append(`<option value="${item.model}">${item.model}</option>`)
        if(!type.includes(item.type))
        $('#select-type').append(`<option value="${item.type}">${item.type}</option>`)
        if(!price.includes(item.price))
        $('#select-price').append(`<option value="${item.price}">${item.price}</option>`)

        // Preparing filtered Unique Elements array
        make.push(item.make)
        model.push(item.model)
        type.push(item.type)
        price.push(item.price)
    }
    
    // FILTERING LOGIC =============================================================================
    $('select').change( () => {
        let selectmakePara = $('#select-make').val();
        let selectmodelPara = $('#select-model').val();
        let selecttypePara = $('#select-type').val();
        let selectpricePara = $('#select-price').val();
        
        let arr = [selectmakePara,selectmodelPara,selecttypePara,selectpricePara] // array of filters paras
    
            filterData = data.filter( (item) => {
    
            // Filter item condition
                if((item.make == arr[0] || arr[0] == '') && 
                (item.model == arr[1] || arr[1] == '') &&
                (item.type == arr[2] || arr[2] == '') &&
                (item.price == arr[3] || arr[3] == '')
                )
                return true;
    
                return false
            })
    
            // empty container before fill with filtered box
            $('.container').html('')
    
            if(filterData.length){
                count = filterData.length;
                // iterate over new filtered items
                for(let i=0;i<filterData.length;i++){
                    let item = filterData[i]
                    makeItemCards(item);
            }
            }
            else{
                count = 0;
                $('.container').html(`<p class="noItems">No Items Found!</p>`)
            }
            $(".count").text(count);
    })

    $('.searchBtn').click( () => {
        $('#select-make').val('');
        $('#select-model').val('');
        $('#select-type').val('');
        $('#select-price').val('');

        let search = $('.search').val().toLowerCase();
        console.log(search);

        let searchData = data.filter( (item) => {
            // Search item condition --> excluding item price
            if((item.make.toLowerCase().includes(search) || 
                item.model.toLowerCase().includes(search) ||
                item.type.toLowerCase().includes(search))
            )
            return true;

            return false;
        });
        // empty container before fill with filtered box
        $('.container').html('')

        if(searchData.length){
            count = searchData.length;
            // iterate over new filtered items
            for(let i=0;i<searchData.length;i++){
                let item = searchData[i]
                makeItemCards(item);
        }
        }
        else{
        count = 0;
        $('.container').html(`<p class="noItems">No Items Found!</p>`)
        }
        $(".count").text(count);

    })
    })

