import { useEffect, useState } from "react";

export function useAnimatedArray<T extends { id: string }>(
  initialArray: T[],
  onChange?: (array: T[]) => void
) {
  const [array, setArray] = useState(initialArray);
  const [uiArray, setUiArray] = useState(() => initialArray.map(item => ({ ...item, ___isDeleting: false })))

  useEffect(() => {
    setUiArray((oldUiArray) => processArrayChange(oldUiArray, array))
  }, [array])

  return {
    array,
    uiArray,
    changeArray: (arr: T[]) => {
      setArray(arr)
      onChange?.(arr)
    },
    changeUiArray: setUiArray,
  }
}


function processArrayChange<T extends { id: string }>(
  oldUiArray: (T & { ___isDeleting: boolean })[],
  newUiArray: T[]
): (T & { ___isDeleting: boolean })[] {
  // ultimately we want the ui array to has all the new items from the new array elements
  // but then if the order is fucked up we can't determine which element is gone
  // so we need to find the element that is gone in the new array
  // but where would it be put in the new array?
  // same index as the old ui array
  // so we need to push the item of the old, to be deleted item, to the new array
  // and push the rest of the new array

  // Find element that is gone in the new array, and also keep track of its index
  const deleted: [index: number, value: (T & { ___isDeleting: boolean })][] = []

  oldUiArray.forEach((item, index) => {
    const isIDinArray = findIDinArray(newUiArray, item.id)
    if (!isIDinArray) {
      deleted.push([index, item])
    }
  })

  // Create new resulting array with the deleted items
  // Firstly, copy new array into the new ui array
  const resultArr = newUiArray.map((item) => {
    return {
      ...item,
      ___isDeleting: false
    }
  })

  // Secondly, add the deleted items into the new ui array
  deleted.forEach(([index, value]) => {
    resultArr.splice(index, 0, {
      ...value,
      ___isDeleting: true
    })
  })

  return resultArr
}


function findIDinArray<T extends { id: string }>(array: T[], id: string) {
  return array.find((item) => item.id === id);
}

// Todo - Unit Test
// https://www.typescriptlang.org/play/?#code/MYewdgziA2CmB0w4EMBOAKAlAbgFC4DMBXMYAFwEtwACAB1RGFgggEFVVkBPdVgLmoQyqCmADmAbQC6AGmoAhAUJHjpmagG9c1HdThlqAE1j7YhgRNHGAHgLBEAtgCNYqOQDdk0IrCXDRYlLS1AC81NL4utSs8AQgqACiyMAAFujoyHIU6iEAfJqRUboA9MXUMIbUFGSwDtRgIAaiCtpFOhQE1OgAhPLwokhExhAZ8GQgADIgAO6uAMLIELBYmOpabW3GpobwtEQQaZZyyFKYrW0AvufUF2fX+tSozETQZOyofiqSUqHh8P-yKSFHRbWA1HZxRLJNLoSxgGweLw+U6hfLrDZPCAvN4ceAQWjQChMdBWWDWOQABkR3gQ4wAqrRaPNFstVtdbsDHmCiKgwFysa93rgrrgHqxfhIAOTISVySVOWXUSXARWSwyKgBEAA0NXKxJKpHgHvIJZL9XKUqqZXKCKqVYb8A85r96IxmGwONxeHJ5DhcKBIDAENAQGJ0HM-aVqAB5IhkPZkCxm1UKi2q9Vy61K21y+34KMBqBweAhsOSgCMitdTBY7y90jkUqz8rtBtWGw7USjAElIK5KOBcAXwEXg6H0JKAExVhg1j2cHhNlOt2ThU7qTudqMAERMYKoYCHZULQZL48lAGYZ27a57F5LWMu5XMDY3pU+lfb20Uo3T4XuaiPagT2LUsJwAFmvOc63vZtU0-V9whbOV1XXTdqB7PtUAHPkAGpqF3fQDyAkCxzLABWKD3Rg2EHyfZVZTVRjYEY21VyXNCuzKXslmwg9qHwwj9xofC-wAWlBQDh0DUDzwANio28F1ouCVzfeCGMzNsNy46gACVYHiYxUBIkdTzAyUAHZFPnet3zlDT7XUldvy3MoDKM1wBIIgDiOk0czzLAAOGyaKXBy1KQjScwQrS0KjDzUGM7yeP7PzjzM2SywATlCu8VNVeRVRfdjkOzVs4vbBLDKSrzRP-UxTJksiJ3LCk8uU8KlUcxCpWilydJKdyauSwTfJE6hUr4wd-PM89y0rORq2o-KurKyUSucm0BraarPNQbyhJwlKsOO+qJIA2B8EIEhyH4ggrG7bdRBggAeAAVagyRqeEIE0KpzEEfxxBuXIMjvAR3obAHPgCNZWieMgeT5NAF1iKx0mqWocnyLGHH6SoQiJgG-RFYhSGO5alO4OYUmQcRYA+r7rB+ww-o0GGga+UH0FaCo6QoGCBHQT6ADJ-oAfSligICOgIBCcEAg3pm5MAbVowFgaYBaF6goaBTBhbFyXpdl3zxAVpWUD5W5gnRKNsQoBxkBqaAuGoWYPfpgwyBSWBqCIChqFR7hqHGag6b+rxoDDv36i1qoagcP6CAYOpff9zXpmDu8vrgBxYDAMgIFaKMnDjWPC6qToM-KWqDpl6hiGAABrMwA9oD3-eAenJQMYwalQBxRH96YUiJFI89qQumj+sRwCunQoygLv4-b8OHvhSup4LovY5dqo54Xqo+VrrOc4XUuynLgwx9cUeQBeSpqmoFw6Ar5oz4TkOuAAfivwQyAC4nxsMHP6tcKgByDj-ABK9Paa3XiAd+Bxt543KDXOOFQ5DhzfpJdueNsFIK-tnGBS8yj00qHsFBtdMQGBABgzO387yFCjAAMSsDvGe+9Z7UHnprE+29z4-2OFvLwK826wE7sIZILd0GJz+qSawrRCz90uoDOENg7COBcG4agngaRG2oOLDmUsJYyzlhbV+VtYAq1uEEH4YQIh82gIYHWd5YjxCSKkTGScsj-msDjAoUQVGHyei9XOYRN6GDCWAGiWc3ELiyEnAmZwogdC6N0GWMSYLw02Go3Y+xDiKKSbUU47JWgcgAXMJ4LtGHZ0xI7EGP8PbVEnrXPBz8k4lzIdQdhqAhBuzkKAWg7shG51EOHYhUCL7cGUSOAwDTBQcF+PEwW7jna0B8djVEQTdCI2RrsqI-x+i+OuDoUx5jzZiAEAQMRi9dBXB0JUnpABlWAAZDCDODoYSo7S1GJ1qAoouRC47n0DjMrgrQOkeKhN42ExS9FIlgCiPIhz+TYneHiAkRJlgIqpGinQxz9E+BkGc6gFyzZEUscIHw7JUmq0KPs3k6KlkmSuKRQKrUOo0zpgzWE7ENAUEBu+C4MhBXmBbKK8VAgGIXE4uhXa3FTrpWAplFqU5uVcFpvTMQyw1o9XYvKhVuk5YzQys1Tll5NXar5VKR8EVny9Xst1HaP4yh-jwU1AKFlIJLVnCtBcNrdUFQdQhUqGlUKuQ7JhXiZ0fJETNaqi1FlKJ+pvLZLVvLg12voiqGQTF80sXzWxN8MojUYSVbG-iY0E14WoOJT1s0soTgUmm6Cd4g16udetJyUUKpKjLVGnpiVjJermmWaybaA08p1V21SuYnUGqHYq-SI06rxuEoeJt6qQpTuppm2dIaXULvDaqGKmkB3aQrau-aJ0q2Jo5RZXKe6M2dqPZKIqjrT3bQXZVdQe167eQ9ZdMdzaKztRfTBN9+rIp9TPa63SI712mrrVNHCoH1ULWtVmudH4NqLvgye5dAHRobrjWh6t9awAXVMEAA