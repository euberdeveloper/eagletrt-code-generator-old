#include ".bin/structure_type.h"

void structureDelete(data_t *data) {
	free(data->inverters.right.speed);
	free(data->inverters.right.temperatureigbt);
	free(data->inverters.right.temperaturemotors);
	free(data->inverters.left.speed);
	free(data->inverters.left.temperatureigbt);
	free(data->inverters.left.temperaturemotors);
	free(data->bmshv.temperature);
	free(data->bmshv.voltage);
	free(data->bmshv.current);
	free(data->bmshv.errors);
	free(data->bmshv.warnings);
	free(data->bmslv.values);
	free(data->bmslv.errors);
	free(data->gps.new);
	free(data->gps.old.location);
	free(data->gps.old.time);
	free(data->gps.old.truetrackmode);
	free(data->imugyro);
	free(data->imuaccel);
	free(data->frontwheelsencoder);
	free(data->distance);
	free(data->throttle);
	free(data->brake);
	free(data->steeringwheel.encoder);
	free(data->steeringwheel.gears);
	free(data);
	
}