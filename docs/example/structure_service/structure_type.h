#ifndef TELEMETRY_STRUCTURE_SERVICE
#define TELEMETRY_STRUCTURE_SERVICE

/* IMPORTS */

#include <stdlib.h>
#include <stdio.h>
#include <string.h>

/* TYPES */

typedef struct {
	long timestamp;
	int value;
} inverters_right_speed_data;

typedef struct {
	long timestamp;
	int value;
} inverters_right_temperatureigbt_data;

typedef struct {
	long timestamp;
	int value;
} inverters_right_temperaturemotors_data;

typedef struct {
	inverters_right_speed_data *speed;
	int speed_count;
	inverters_right_temperatureigbt_data *temperatureigbt;
	int temperatureigbt_count;
	inverters_right_temperaturemotors_data *temperaturemotors;
	int temperaturemotors_count;
} inverters_right_data;

typedef struct {
	long timestamp;
	int value;
} inverters_left_speed_data;

typedef struct {
	long timestamp;
	int value;
} inverters_left_temperatureigbt_data;

typedef struct {
	long timestamp;
	int value;
} inverters_left_temperaturemotors_data;

typedef struct {
	inverters_left_speed_data *speed;
	int speed_count;
	inverters_left_temperatureigbt_data *temperatureigbt;
	int temperatureigbt_count;
	inverters_left_temperaturemotors_data *temperaturemotors;
	int temperaturemotors_count;
} inverters_left_data;

typedef struct {
	inverters_right_data right;
	inverters_left_data left;
} inverters_data;

typedef struct {
	double max;
	double min;
	double average;
} bmshv_temperature_value_data;

typedef struct {
	long timestamp;
	bmshv_temperature_value_data value;
} bmshv_temperature_data;

typedef struct {
	double max;
	double min;
	double total;
} bmshv_voltage_value_data;

typedef struct {
	long timestamp;
	bmshv_voltage_value_data value;
} bmshv_voltage_data;

typedef struct {
	double current;
	double pow;
} bmshv_current_value_data;

typedef struct {
	long timestamp;
	bmshv_current_value_data value;
} bmshv_current_data;

typedef struct {
	int faultid;
	int faultindex;
} bmshv_errors_value_data;

typedef struct {
	long timestamp;
	bmshv_errors_value_data value;
} bmshv_errors_data;

typedef struct {
	int faultid;
	int faultindex;
} bmshv_warnings_value_data;

typedef struct {
	long timestamp;
	bmshv_warnings_value_data value;
} bmshv_warnings_data;

typedef struct {
	bmshv_temperature_data *temperature;
	int temperature_count;
	bmshv_voltage_data *voltage;
	int voltage_count;
	bmshv_current_data *current;
	int current_count;
	bmshv_errors_data *errors;
	int errors_count;
	bmshv_warnings_data *warnings;
	int warnings_count;
} bmshv_data;

typedef struct {
	double voltage;
	double temperature;
} bmslv_values_value_data;

typedef struct {
	long timestamp;
	bmslv_values_value_data value;
} bmslv_values_data;

typedef struct {
	long timestamp;
	int value;
} bmslv_errors_data;

typedef struct {
	bmslv_values_data *values;
	int values_count;
	bmslv_errors_data *errors;
	int errors_count;
} bmslv_data;

typedef struct {
	double latitudeGGAsafe;
	double longitudeGGAsafe;
	double latitudeGGA;
	double longitudeGGA;
	double altitudeGGA;
	char* nsindicatorGGA;
	char* ewindicatorGGA;
	char* utctimeGGA;
	double latitudeGLL;
	double longitudeGLL;
	char* nsindicatorGLL;
	char* ewindicatorGLL;
	char* utctimeGLL;
	double groundspeedknotsVTG;
	double groundspeedhumanVTG;
	double latitudeRMC;
	double longitudeRMC;
	char* nsindicatorRMC;
	char* ewindicatorRMC;
	char* utctimeRMC;
	char* dateRMC;
	double groundspeedknotsRMC;
} gps_new_value_data;

typedef struct {
	long timestamp;
	gps_new_value_data value;
} gps_new_data;

typedef struct {
	double latitudem;
	int latitudeo;
	double longitudem;
	int longitudeo;
	double speed;
	double altitude;
} gps_old_location_value_data;

typedef struct {
	long timestamp;
	gps_old_location_value_data value;
} gps_old_location_data;

typedef struct {
	int hours;
	int minutes;
	int seconds;
} gps_old_time_value_data;

typedef struct {
	long timestamp;
	gps_old_time_value_data value;
} gps_old_time_data;

typedef struct {
	long timestamp;
	int value;
} gps_old_truetrackmode_data;

typedef struct {
	gps_old_location_data *location;
	int location_count;
	gps_old_time_data *time;
	int time_count;
	gps_old_truetrackmode_data *truetrackmode;
	int truetrackmode_count;
} gps_old_data;

typedef struct {
	gps_new_data *new;
	int new_count;
	gps_old_data old;
} gps_data;

typedef struct {
	double x;
	double y;
	double z;
	double scale;
} imugyro_value_data;

typedef struct {
	long timestamp;
	imugyro_value_data value;
} imugyro_data;

typedef struct {
	double x;
	double y;
	double z;
	double scale;
} imuaccel_value_data;

typedef struct {
	long timestamp;
	imuaccel_value_data value;
} imuaccel_data;

typedef struct {
	double speed;
	double speedms;
} frontwheelsencoder_value_data;

typedef struct {
	long timestamp;
	frontwheelsencoder_value_data value;
} frontwheelsencoder_data;

typedef struct {
	double meters;
	double rotations;
	double angle;
	double clockperiod;
} distance_value_data;

typedef struct {
	long timestamp;
	distance_value_data value;
} distance_data;

typedef struct {
	long timestamp;
	double value;
} throttle_data;

typedef struct {
	long timestamp;
	double value;
} brake_data;

typedef struct {
	long timestamp;
	double value;
} steeringwheel_encoder_data;

typedef struct {
	int control;
	int cooling;
	int map;
} steeringwheel_gears_value_data;

typedef struct {
	long timestamp;
	steeringwheel_gears_value_data value;
} steeringwheel_gears_data;

typedef struct {
	steeringwheel_encoder_data *encoder;
	int encoder_count;
	steeringwheel_gears_data *gears;
	int gears_count;
	int marker;
} steeringwheel_data;

typedef struct {
	int id;
	long timestamp;
	char* sessionName;
	inverters_data inverters;
	bmshv_data bmshv;
	bmslv_data bmslv;
	gps_data gps;
	imugyro_data *imugyro;
	int imugyro_count;
	imuaccel_data *imuaccel;
	int imuaccel_count;
	frontwheelsencoder_data *frontwheelsencoder;
	int frontwheelsencoder_count;
	distance_data *distance;
	int distance_count;
	throttle_data *throttle;
	int throttle_count;
	brake_data *brake;
	int brake_count;
	steeringwheel_data steeringwheel;
} data_t;


typedef enum { 
    GATHER_IDLE, 
    GATHER_ENABLE, 
    GATHER_KEEP, 
    GATHER_ERROR 
} gather_code;

/* FUNCTIONS */

data_t* structureCreate();
void structureToBson(data_t *document, bson_t **bson_document);
void structureDelete(data_t *document);

#endif