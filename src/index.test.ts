import { isZip} from './';

describe("zipcode", () => {

  it("should return true if input is a zipcode", () => {
    const input = "12550";
    const returnVal = isZip(input);
    expect(returnVal).toBe(true)
  })

  it("should return false if input is not a zipcode", () => {
    const input = "12zjsunahfh433450";
    const returnVal = isZip(input);
    expect(returnVal).toBe(false);
  })

})