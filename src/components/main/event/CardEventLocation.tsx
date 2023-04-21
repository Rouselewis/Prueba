import React, { useState } from 'react';
import { classNames } from '@/helpers';
import { Map, Title, Button, Icon } from '@/components/commons';
import { useTranslations } from 'next-intl';
import { CurrentColor } from '@/helpers';
import { CustomTag } from '@/components/commons/customTag';
export type props = {
  className?: string;
  location: string;
  origin: google.maps.LatLngLiteral;
  tags: string[];
};

const CardEventLocation: React.FC<props> = ({
  className,
  location,
  origin,
  tags,
}) => {
  const [userLocation, setUserLocation] = useState(null);
  const currentColor = CurrentColor();
  const t = useTranslations('Card_Event_Location');
  async function handleTraceRoute() {
    const getUserLocation = (): Promise<google.maps.LatLngLiteral> => {
      return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          reject('Geolocation is not supported by your browser');
        } else {
          navigator.permissions
            .query({ name: 'geolocation' })
            .then((permissionStatus) => {
              if (permissionStatus.state === 'granted') {
                navigator.geolocation.getCurrentPosition(
                  (position) => {
                    const { latitude, longitude } = position.coords;
                    const userLocation: google.maps.LatLngLiteral = {
                      lat: latitude,
                      lng: longitude,
                    };
                    resolve(userLocation);
                  },
                  () => {
                    reject('Unable to retrieve your location');
                  }
                );
              } else if (permissionStatus.state === 'prompt') {
                navigator.geolocation.getCurrentPosition(
                  (position) => {
                    const { latitude, longitude } = position.coords;
                    const userLocation: google.maps.LatLngLiteral = {
                      lat: latitude,
                      lng: longitude,
                    };
                    resolve(userLocation);
                  },
                  () => {
                    reject('Unable to retrieve your location');
                  }
                );
              } else {
                reject('Location permission denied');
              }
            });
        }
      });
    };
    const location = await getUserLocation();
    setUserLocation(location);
  }

  return (
    <div className={classNames('flex flex-col space-y-5', className)}>
      <div className="flex items-center justify-between">
        <Title level="h6">{t('location_map')}</Title>
        <Button
          iconLeft={<Icon name="routes-solid" />}
          onClick={handleTraceRoute}
        >
          {t('trace_route')}
        </Button>
      </div>
      <div>
        <p>{location}</p>
        <Map
          className="w-full h-[300px]"
          origin={userLocation || origin}
          destination={origin}
          zoom={15}
        ></Map>
      </div>
      <div className="flex flew-wrap gap-5">
        {tags?.map((tag, idx) => (
          <CustomTag key={idx} name={tag} />
        ))}
      </div>
    </div>
  );
};

export default CardEventLocation;
