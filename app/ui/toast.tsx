"use client";
import { ReactNode, useState, createContext, useContext } from "react";

type ContextState = {
  open: (toastInfo: ToastInfo) => void;
  close: (name: string) => void;
};

export const ToastContext = createContext<ContextState>({
  open: () => {
    console.error("no context found");
  },
  close: () => {
    console.error("no context found");
  },
});

export const useToast = () => useContext(ToastContext);

export type ToastInfo = {
  name?: string;
  component: ReactNode;
  duration?: number;
};

type ToastInfoArray = ToastInfo[];

const pos2cls = {
  "top-left": "top-0 left-0",
  "top-right": "top-0 right-0",
  "top-center": "top-0 left-1/2 -translate-x-1/2",
  "bottom-left": "bottom-0 left-0",
  "bottom-right": "bottom-0 right-0",
  "bottom-center": "bottom-0 left-1/2 -translate-x-1/2",
};

type PositionType = keyof typeof pos2cls;

export function ToastContainer({
  children,
  position = "bottom-center",
}: {
  children: ReactNode;
  position?: PositionType;
}) {
  const [toasts, setToasts] = useState<ToastInfoArray>([]);

  function open({
    name = String(Date.now()) + String(Math.floor(Math.random() * 10000)),
    component,
    duration = 3000,
  }: ToastInfo) {
    setToasts((toasts) => [...toasts, { name, component, duration }]);
    setTimeout(() => close(name), duration);
  }

  function close(name: string) {
    setToasts((toasts) => toasts.filter((toast) => toast.name !== name));
  }

  return (
    <ToastContext.Provider value={{ open, close }}>
      {children}
      <div className={"fixed m-2 " + pos2cls[position]}>
        <div className="space-y-1">
          {toasts.map(({ name, component }) => (
            <div key={name} className="relative">
              {name && (
                <button
                  onClick={() => close(name)}
                  className="absolute p-1 top-1 right-1 rounded-lg ">
                  <div className="">{closeMarker}</div>
                </button>
              )}
              {component}
            </div>
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
}

const closeMarker: ReactNode = (
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    x="0"
    y="0"
    width="5.576"
    height="5.576"
    viewBox="0, 0, 5.576, 5.576">
    <g id="layer1" transform="translate(0, 0)">
      <g>
        <path
          d="M4.535,-0.111 L5.465,0.818 L3.606,2.677 L5.465,4.535 L4.535,5.465 L2.677,3.606 L0.818,5.465 L-0.111,4.535 L1.747,2.677 L-0.111,0.818 L0.818,-0.111 L2.677,1.747 L4.535,-0.111 z"
          fill="#606060"
        />
      </g>
    </g>
  </svg>
);
