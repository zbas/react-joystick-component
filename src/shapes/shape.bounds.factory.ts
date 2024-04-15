import {JoystickShape} from "../enums/shape.enum";

export const shapeBoundsFactory = (
    shape: JoystickShape,
    controlLength : number,
    absoluteX: number,
    absoluteY: number,
    relativeX:number,
    relativeY:number,
    dist:number,
    baseSize: number,
    parentRect: DOMRect) => {
    switch (shape){
        case JoystickShape.Square:
            relativeX = getWithinBounds(absoluteX - parentRect.left - (baseSize / 2), controlLength*2);
            relativeY = getWithinBounds(absoluteY - parentRect.top - (baseSize / 2), controlLength*2);
            return {relativeX, relativeY};
        case JoystickShape.AxisX:
            relativeX = getWithinBounds(absoluteX - parentRect.left - (baseSize / 2), controlLength*2);
            relativeY = 0;
        return {relativeX, relativeY};

        case JoystickShape.AxisY:
            relativeX = 0
            relativeY = getWithinBounds(absoluteY - parentRect.top - (baseSize / 2), controlLength*2);
            return {relativeX, relativeY};
        default:
            if (dist > controlLength) {
                relativeX *= controlLength / dist;
                relativeY *= controlLength / dist;
            }
            return {relativeX, relativeY};

    }

}

const getWithinBounds = (value:number, baseSize:number): number =>  {
    const halfBaseSize = baseSize / 2;
    if(value > halfBaseSize){
        return halfBaseSize;
    }
    if(value < -(halfBaseSize)){
        return halfBaseSize * -1;
    }
    return value
}