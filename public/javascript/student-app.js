const form = document.querySelector("form");
const formInput = document.querySelector(".formInput");


/*function searchResultsHtml(resources){
	return resources.map(resource => {
		return `
			<a href="/show/${resource._id} class="searcResult">
				<strong>${resource.matric_number}</strong>
				<strong>${resource.firstname}</strong>
			</a>
		`;
	}).join("")
}


 function typeAhead(search){
 	if(!search) return;

 	const searchInput = search.querySelector("input[name='search']");
 	const searchResults = search.querySelector(".searcResult") ;

 	searchInput.addEventListener("input", function(){
 		if(!this.value){
 			searchResults.style.display = "none"
 			return;
 		}

 		searchResults.style.display = "block";
 		
 		axios
 			.get(`/api/search?q=${this.value}`)
 			.then(res => {
 				if(res.data.length){
 					const html = DOMPurify.sanitize(searchResultsHtml(res.data));
 					console.log(html);
 				}
 				searchResults.innerHTML = "";

 			})
 			.catch(err => {
 				console.log(err);
 			});
  		});
 };


typeAhead(form);

function see(test){

}
*/

$(".btn").click(function(){
	let errorMessage = "";
	let fieldMissing =  "";

	if ($("#firstname").val() == ""){
		fieldMissing += "<br>Firstname";
	}

	if ($("#lasttname").val() == ""){
		fieldMissing += "<br>Lasttname";
	}

	if ($("#middlename").val() == ""){
		fieldMissing += "<br>Middlename";
	}

	if ($("#nationality").val() == ""){
		fieldMissing += "<br>Nationality";
	}

	if ($("#address").val() == ""){
		fieldMissing += "<br>Address";
	}

	if ($("#state_of_origin").val() == ""){
		fieldMissing += "<br>State of Origin";
	}

	if ($("#date_of_birth").val() == ""){
		fieldMissing += "<br>Date of Birth";
	}

	if ($("#matric_number").val() == "" ){
		fieldMissing += "<br>Matric Number";
	}

	if ($("#year_of_admission").val() == ""){
		fieldMissing += "<br>Year of Admission";
	}


	if (fieldMissing != ""){
		errorMessage += "<p>The following fields are missing: " + fieldMissing;
	}

	if(errorMessage != ""){
		$("#errors").html(errorMessage);
		$("#errors").show();
		return false
	}else{
		
		$("#errors").hide();

	}

});




