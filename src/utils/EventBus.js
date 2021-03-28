/**
 * helper to share data between components
 */
import Vue from 'vue';
const EventBus = new Vue();

// API
// listen: EventBus.$on('EventName', function(){/* handler */})
// fire event: EventBus.$emit('EventName', /* args */)
export default EventBus;
