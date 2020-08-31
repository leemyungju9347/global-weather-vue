import Vue from 'vue';
import Vuex from 'vuex';
import { currentWeather, weeklyWeather } from '@/api/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 검색 도시
    currentCity: '',
    // 현재 날씨 데이터
    weatherData: [],
    weatherMain: null,
    weatherInfo: null,
    // 위치
    location: {
      lat: null,
      lon: null
    },
    // 주간 날씨 데이터
    weeklyData: [],
    weekly: null,
    timezone: '',
    sunrise: '',
    sunset: '',
    currentTime: '',
    dayStatus: 'day'
  },
  mutations: {
    SET_WEATHER(state, data) {
      state.weatherData = data;
      state.weatherMain = data.main;
      state.weatherInfo = data.weather[0];
      state.location.lat = data.coord.lat;
      state.location.lon = data.coord.lon;
      state.currentCity = data.name;
      state.sunrise = data.sys.sunrise;
      state.sunset = data.sys.sunset;
    },
    SET_CITY(state, city) {
      state.city = city;
    },
    SET_WEEKLY(state, data) {
      state.weekly = data;
      state.weeklyData = data.daily;
      state.timezone = data.timezone;
    },
    SET_DAY(state, data) {
      state.dayStatus = data;
    }
  },
  actions: {
    // 현재 날씨 데이터
    async FETCH_WEATHER({ commit }, cityName) {
      try {
        console.log('위치는 store 시티네임', cityName);
        const response = await currentWeather(cityName);

        commit('SET_WEATHER', response.data);

        return response;
      } catch (error) {
        console.log('여기는 스토어 fetch current weather', error);
      }
    },
    // 주간 날씨 데이터
    async FETCH_WEEKLY_WEATHER({ commit }, location) {
      try {
        const response = await weeklyWeather(location);

        commit('SET_WEEKLY', response.data);
        return response;
      } catch (error) {
        console.log('여기는 스토어 fetch weekly weather', error);
      }
    }
  },
  modules: {}
});
