import _ from "lodash";
import React, { useEffect, useRef, RefObject } from "react";

let autoComplete: {
  setFields: (arg0: string[]) => void;
  addListener: (arg0: string, arg1: () => void) => void;
  getPlace: () => any;
};

const loadScript = (url: string, callback: Function) => {
  // Don't load Google API script in every component mounts
  if (window.google) {
    callback();
    return;
  }

  const scriptEl = document.createElement("script");
  const initMapEl = document.createElement("script");

  initMapEl.type = "text/javascript";
  initMapEl.textContent = "function initMapPlaceholderFunc() {}";

  scriptEl.type = "text/javascript";
  scriptEl.onload = () => callback();
  scriptEl.src = url;

  document.getElementsByTagName("head")[0].appendChild(initMapEl);
  document.getElementsByTagName("head")[0].appendChild(scriptEl);
};

export type OnPlaceSelectedParamType = {
  city: string;
  state: string;
  zip: string;
  country: { long_name: string; short_name: string };
  address: string;
};

type Props = {
  label?: string;
  input?: {
    [key: string]: any;
  };
  className?: string;
  errors?: string[];
  onPlaceSelected: (data: OnPlaceSelectedParamType) => void;
  countryRestriction?: string;
  value?: string;
  onClear?: () => void;
  onFocus?: () => void;
  apiKey: string | undefined;
};

const GooglePlaceAutocomplete = ({
  label,
  apiKey,
  input,
  className,
  errors,
  onPlaceSelected,
  countryRestriction,
  value,
  onClear,
  onFocus,
}: Props) => {
  const autoCompleteRef = useRef<HTMLInputElement>(null);

  const handlePlaceSelect = (maps: any) => {
    const place = autoComplete.getPlace();

    // updateQuery(place.formatted_address);
    let address = _.get(place, "address_components");
    let city = "";
    let state = "";
    let zip = "";
    let country = { long_name: "", short_name: "" };

    _.forEach(address, function (component) {
      const types = _.get(component, "types");
      if (_.includes(types, "country")) {
        country = component;
      }
      if (_.includes(types, "locality")) {
        city = _.get(component, "long_name");
      }
      if (_.includes(types, "administrative_area_level_1")) {
        state = _.get(component, "long_name");
      }
      if (_.includes(types, "postal_code")) {
        zip = _.get(component, "long_name");
      }
    });

    onPlaceSelected({
      city: city ?? "",
      state: state ?? "",
      zip: zip ?? "",
      country: country ?? { long_name: "", short_name: "" },
      address: autoCompleteRef.current!.value,
    });
  };

  const handleScriptLoad = (
    autoCompleteRef: RefObject<HTMLInputElement>,
    countryRestriction?: string
  ) => {
    const { maps } = window.google;
    autoComplete = new maps.places.Autocomplete(
      autoCompleteRef.current as HTMLInputElement,
      {
        componentRestrictions: { country: countryRestriction ?? "" },
      }
    );

    autoComplete.addListener("place_changed", () => handlePlaceSelect(maps));
  };

  const validClasses =
    "appearance-none block w-full pl-3 pr-3 py-2 border border-gray-300 rounded shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm";
  const errorClasses =
    "appearance-none block w-full pl-3 pr-3 py-2 border border-red-300 rounded shadow-sm placeholder-red-300 focus:outline-none focus:ring-primary-500 focus:border-red-500 sm:text-sm";

  useEffect(() => {
    if (autoCompleteRef.current && value) {
      autoCompleteRef.current.value = value;
    }
  }, [value]);

  useEffect(() => {
    const googleURL = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&language=en&callback=initMapPlaceholderFunc`;
    loadScript(googleURL, () =>
      handleScriptLoad(autoCompleteRef, countryRestriction)
    );
  }, [countryRestriction]);

  return (
    <>
      <label
        htmlFor={input?.id}
        className={"block text-sm font-medium text-gray-700 mb-2"}
      >
        {label}
      </label>
      <div className="relative flex">
        <input
          className={`${
            errors?.length ? errorClasses : validClasses
          } ${className}`}
          {...input}
          ref={autoCompleteRef}
          onFocus={onFocus}
        />
        <div className="absolute top-2 right-2">
          <button
            type="button"
            onClick={() => {
              autoCompleteRef.current!.value = "";
              if (onClear) onClear();
            }}
            className="inset-y-0 right-0 flex items-center pr-3 text-gray-400"
          >
            Clear
          </button>
        </div>
      </div>
      {errors && (
        <p className="text-xs text-red-600" id={`${input?.id}-error`}>
          {errors.join(", ")}
        </p>
      )}
    </>
  );
};

export default GooglePlaceAutocomplete;
