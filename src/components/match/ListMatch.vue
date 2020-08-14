<template>	
	<div class="row" >		
	  <!-- <datepicker v-model="match_date" ></datepicker> -->
	  <template v-if="!matches.length">
		  <content-placeholders
			v-for="p in 30"
            :key="p"
		    :rounded="true">
			 
			 <content-placeholders-text :lines="3" />
			 <content-placeholders-heading />
				
		  </content-placeholders>
	  </template>
	  <template v-if="matches.length">
		  <div v-for="elem in matches" :key="elem" class="card">
			<div class="card-content">
				<div class="field">
				<label class="label">
					{{ elem.competition.name}}
				</label>
				<time>
					{{ elem.utcDate | moment }}
				</time>
				<span>
					{{ elem.status}}
				</span>
				</div>
				<div class="row">
					<span>
						{{ elem.homeTeam.name}}&nbsp;&nbsp; {{ elem.score.fullTime.homeTeam}}
					</span>
					<p>
						V.S
					</p>
					<span>
						{{ elem.awayTeam.name}}&nbsp;&nbsp; {{ elem.score.fullTime.awayTeam}}
					</span>
				</div>
				<!-- Button code -->
				<div title="Add to Calendar" class="addeventatc">
					Add to Calendar
					<span class="start">{{ elem.utcDate | moment }}</span>
					<span class="end">{{ elem.utcDate | moment }}</span>
					<span class="timezone">
				</span>
					<span class="title">{{ elem.competition.name}} {{ elem.stage}}</span>
					<span class="description">{{ elem.homeTeam.name}} V.S {{ elem.awayTeam.name}}</span>
					<span class="location">Location of the event</span>
				</div>
			</div>
      	  </div>
	  </template>
	  
	</div>
	
</template>

<script>
import Datepicker from 'vuejs-datepicker';

export default {
	components: {
		Datepicker,
  	},
	data() {
		return {
			currentPage: 1,
			matches: [],
			match_date : new Date(),
			info: null
		};
	},
	methods :{
		async fetch() {

			let current_date = new Date();
			var today = new Date();
			var dd = String(today.getDate()).padStart(2, '0');
			var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
			var yyyy = today.getFullYear();
			let date_str = yyyy+"-"+mm+"-"+dd;

			this.$http
			.get('https://api.football-data.org/v2/matches/?dateFrom='+date_str+'&dateTo='+date_str, { 'headers': { 'X-Auth-Token': process.env.VUE_APP_MATCH_API_KEY } })
			.then((response) => {
				this.info = response.data;
				this.matches = response.data.matches;
			})

		}
	},
	filters: {
		moment: function (date) {
			return moment(date).format('MMMM Do YYYY, h:mm:ss a');
		}
  	},
	beforeMount(){
    	 this.fetch()
 	},
}
</script>

<style lang="scss">
	.card {
		margin: 1em;
	}
</style>